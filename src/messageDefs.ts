/*
RocketCAN message definitions.

Each message type is a class that owns:
- `static fields`        : ordered list of Field transcoders for the payload bytes
- `static metadataField` : Field used to decode the 8-bit Metadata in the SID (per-msg-type)
- `static decode(bs)`    : inherited generic decoder that walks `fields` and returns a typed instance

See: https://docs.waterloorocketry.com/avionics/rocketcan/packet-format.html
*/

import { BitString } from './bitString.js'
import { ASCII, Bitfield, Enum, Numeric } from './fields.js'
import type { Field } from './fields.js'
import {
    actuator_id,
    actuator_state,
    alt_arm_state,
    altimeter_id,
    analog_sensor_id,
    board_error_bitfield_offset,
    board_inst_id,
    board_type_id,
    dem_2d_sensor_id,
    dem_3d_sensor_id,
    msg_prio,
    msg_type,
} from './message_types.js'

// SID-level field constants (shared, not per-msg-type)

export const MESSAGE_PRIO     = new Enum('msg_prio', 2, msg_prio)
export const MESSAGE_TYPE     = new Enum('msg_type', 7, msg_type)
export const BOARD_TYPE_ID    = new Enum('board_type_id', 6, board_type_id)
export const BOARD_INST_ID    = new Enum('board_inst_id', 6, board_inst_id)
export const MESSAGE_METADATA = new Numeric('msg_metadata', 8)
export const MESSAGE_SID_LEN =
    MESSAGE_PRIO.length +
    MESSAGE_TYPE.length +
    BOARD_TYPE_ID.length +
    BOARD_INST_ID.length +
    MESSAGE_METADATA.length

// Shared payload field: 16-bit millisecond timestamp, scaled to seconds.
export const TIMESTAMP_2 = new Numeric('time', 16, 1 / 1000, false, true, 's')

// Base class — owns the generic decoder
export class ParsleyDataPayload {
    static readonly fields: readonly Field[] = []
    static readonly metadataField: Field = MESSAGE_METADATA

    constructor(data: Record<string, unknown>) {
        Object.assign(this, data)
    }

    static decode<T extends ParsleyDataPayload>(
        this: { new (data: Record<string, unknown>): T; readonly fields: readonly Field[] },
        bs: BitString,
    ): T {
        const data: Record<string, unknown> = {}
        for (const field of this.fields) {
            data[field.name] = field.decode(bs.pop(field.length, field.variable_length))
        }
        return new this(data)
    }
}

// properties corresponding to a decoded set of Fields
type PayloadOf<F extends readonly Field[]> = {
    [P in F[number] as P['name']]: ReturnType<P['decode']>
}

// changes constructor signature to include decoded field properties
type PayloadBase<D = unknown> = Omit<typeof ParsleyDataPayload, 'prototype'> & {
    new (data: Record<string, unknown>): ParsleyDataPayload & D    
}

// factory function for defining new message types
function payload<const F extends readonly Field[]>(
    fields: F,
    metadataField: Field = MESSAGE_METADATA,
): PayloadBase<PayloadOf<F>> {
    return class extends ParsleyDataPayload {
        static override fields = fields
        static override metadataField = metadataField
    } as unknown as PayloadBase<PayloadOf<F>>;
}

// One class per msg_type (24 total: UNDEFINED + 23 real types)

export class UNDEFINED extends payload([]) {}

export class GENERAL_BOARD_STATUS extends payload([
    TIMESTAMP_2,
    new Bitfield('board_error_bitfield', 32, 'E_NOMINAL', board_error_bitfield_offset),
]) {}

export class RESET_CMD extends payload([
    TIMESTAMP_2,
    new Enum('board_type_id', 8, board_type_id),
    new Enum('board_inst_id', 8, board_inst_id),
]) {}

export class DEBUG_RAW extends payload([
    TIMESTAMP_2,
    new ASCII('string', 48),
]) {}

export class CONFIG_SET extends payload([
    TIMESTAMP_2,
    new Enum('board_type_id', 8, board_type_id),
    new Enum('board_inst_id', 8, board_inst_id),
    new Numeric('config_id', 16),
    new Numeric('config_value', 16),
]) {}

export class CONFIG_STATUS extends payload([
    TIMESTAMP_2,
    new Numeric('config_id', 16),
    new Numeric('config_value', 16),
]) {}

export class ACTUATOR_CMD extends payload([
    TIMESTAMP_2,
    new Enum('cmd_state', 8, actuator_state),
], new Enum('msg_metadata', 8, actuator_id)) {}

export class ACTUATOR_STATUS extends payload([
    TIMESTAMP_2,
    new Enum('cmd_state', 8, actuator_state),
    new Enum('curr_state', 8, actuator_state),
], new Enum('msg_metadata', 8, actuator_id)) {}

export class ALT_ARM_CMD extends payload([
    TIMESTAMP_2,
    new Enum('alt_arm_state', 8, alt_arm_state),
], new Enum('msg_metadata', 8, altimeter_id)) {}

export class ALT_ARM_STATUS extends payload([
    TIMESTAMP_2,
    new Enum('alt_arm_state', 8, alt_arm_state),
    new Numeric('drogue_v', 16),
    new Numeric('main_v', 16),
], new Enum('msg_metadata', 8, altimeter_id)) {}

export class SENSOR_ANALOG16 extends payload([
    TIMESTAMP_2,
    new Numeric('value', 16),
], new Enum('msg_metadata', 8, analog_sensor_id)) {}

export class SENSOR_ANALOG32 extends payload([
    TIMESTAMP_2,
    new Numeric('value', 32),
], new Enum('msg_metadata', 8, analog_sensor_id)) {}

export class SENSOR_2D_ANALOG24 extends payload([
    TIMESTAMP_2,
    new Numeric('value_x', 24),
    new Numeric('value_y', 24),
], new Enum('msg_metadata', 8, dem_2d_sensor_id)) {}

export class SENSOR_3D_ANALOG16 extends payload([
    TIMESTAMP_2,
    new Numeric('value_x', 16),
    new Numeric('value_y', 16),
    new Numeric('value_z', 16),
], new Enum('msg_metadata', 8, dem_3d_sensor_id)) {}

export class GPS_TIMESTAMP extends payload([
    TIMESTAMP_2,
    new Numeric('hrs', 8),
    new Numeric('mins', 8),
    new Numeric('secs', 8),
    new Numeric('dsecs', 8),
]) {}

export class GPS_LATITUDE extends payload([
    TIMESTAMP_2,
    new Numeric('degs', 8),
    new Numeric('mins', 8),
    new Numeric('dmins', 16),
    new ASCII('direction', 8),
]) {}

export class GPS_LONGITUDE extends payload([
    TIMESTAMP_2,
    new Numeric('degs', 8),
    new Numeric('mins', 8),
    new Numeric('dmins', 16),
    new ASCII('direction', 8),
]) {}

export class GPS_ALTITUDE extends payload([
    TIMESTAMP_2,
    new Numeric('altitude', 32),
    new Numeric('daltitude', 8),
]) {}

export class GPS_INFO extends payload([
    TIMESTAMP_2,
    new Numeric('num_sats', 8),
    new Numeric('quality', 8),
]) {}

export class STREAM_STATUS extends payload([
    TIMESTAMP_2,
    new Numeric('total_size', 24),
    new Numeric('tx_size', 24),
]) {}

// Metadata is SEQ_ID (numeric per docs); uses default MESSAGE_METADATA.
export class STREAM_DATA extends payload([
    TIMESTAMP_2,
    new ASCII('data', 48),
]) {}

export class STREAM_RETRY extends payload([
    TIMESTAMP_2,
]) {}

export class TELEMETRY_INFO extends payload([
    TIMESTAMP_2,
    new Numeric('lqi', 8),
    new Numeric('rssi', 8),
]) {}

export class TELEMETRY_STATE_SWITCH extends payload([
    TIMESTAMP_2,
], new Enum('msg_metadata', 8, board_inst_id)) {}

export class CANARD_FIRMWARE_ERROR extends payload([
    TIMESTAMP_2,
    new Numeric('error_code', 32),
    new Numeric('severity', 8),
]) {}

export class LEDS_ON extends payload([]) {}

export class LEDS_OFF extends payload([]) {}

// Registry — exhaustive coverage of msg_type enforced by `satisfies`

export const MESSAGE_DEFS = {
    UNDEFINED,
    GENERAL_BOARD_STATUS,
    RESET_CMD,
    DEBUG_RAW,
    CONFIG_SET,
    CONFIG_STATUS,
    ACTUATOR_CMD,
    ACTUATOR_STATUS,
    ALT_ARM_CMD,
    ALT_ARM_STATUS,
    SENSOR_ANALOG16,
    SENSOR_ANALOG32,
    SENSOR_2D_ANALOG24,
    SENSOR_3D_ANALOG16,
    GPS_TIMESTAMP,
    GPS_LATITUDE,
    GPS_LONGITUDE,
    GPS_ALTITUDE,
    GPS_INFO,
    STREAM_STATUS,
    STREAM_DATA,
    STREAM_RETRY,
    TELEMETRY_INFO,
    TELEMETRY_STATE_SWITCH,
    CANARD_FIRMWARE_ERROR,
    LEDS_ON,
    LEDS_OFF,
} satisfies Record<keyof typeof msg_type, PayloadBase>

export type MessageDefKey = keyof typeof MESSAGE_DEFS

// Discriminated union — `data` is a class instance, `msg_metadata` is loose (string | number)

type ParsleyMessageEntry<K extends MessageDefKey> = {
    msg_prio: keyof typeof msg_prio | string
    msg_type: K
    board_type_id: keyof typeof board_type_id | string
    board_inst_id: keyof typeof board_inst_id | string
    msg_metadata: string | number
    data: InstanceType<(typeof MESSAGE_DEFS)[K]> | null
}

export type ParsleyMessage = {
    [K in MessageDefKey]: ParsleyMessageEntry<K>
}[MessageDefKey]
