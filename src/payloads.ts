import { z } from 'zod'

// ============================================================
// Base Payload
// ============================================================

/**
 * All decoded CAN message payloads include a `time` field
 * representing the message timestamp in milliseconds.
 */
const BasePayload = z.object({
    time: z.number(),
})

// ============================================================
// Individual Payload Schemas
// ============================================================

export const GeneralBoardStatusPayload = BasePayload.extend({
    general_board_status: z.string(),
    board_error_bitfield: z.string(),
})

export const ResetCmdPayload = BasePayload.extend({
    board_type_id: z.string(),
    board_inst_id: z.string(),
})

export const DebugRawPayload = BasePayload.extend({
    string: z.string(),
})

export const ConfigSetPayload = BasePayload.extend({
    board_type_id: z.string(),
    board_inst_id: z.string(),
    config_id: z.number(),
    config_value: z.number(),
})

export const ConfigStatusPayload = BasePayload.extend({
    config_id: z.number(),
    config_value: z.number(),
})

export const ActuatorCmdPayload = BasePayload.extend({
    actuator: z.string(),
    cmd_state: z.string(),
})

export const ActuatorAnalogCmdPayload = BasePayload.extend({
    actuator: z.string(),
    cmd_state: z.number(),
})

export const ActuatorStatusPayload = BasePayload.extend({
    actuator: z.string(),
    curr_state: z.string(),
    cmd_state: z.string(),
})

export const AltArmCmdPayload = BasePayload.extend({
    alt_id: z.string(),
    alt_arm_state: z.string(),
})

export const AltArmStatusPayload = BasePayload.extend({
    alt_id: z.string(),
    alt_arm_state: z.string(),
    drogue_v: z.number(),
    main_v: z.number(),
})

export const SensorAltitudePayload = BasePayload.extend({
    altitude: z.number(),
    apogee_state: z.string(),
})

export const SensorImuPayload = BasePayload.extend({
    imu_id: z.string(),
    linear_accel: z.number(),
    angular_velocity: z.number(),
})

export const SensorMagPayload = BasePayload.extend({
    imu_id: z.string(),
    mag: z.number(),
})

export const SensorBaroPayload = BasePayload.extend({
    imu_id: z.string(),
    pressure: z.number(),
    temp: z.number(),
})

export const SensorAnalogPayload = BasePayload.extend({
    sensor_id: z.string(),
    value: z.number(),
})

export const GpsTimestampPayload = BasePayload.extend({
    hrs: z.number(),
    mins: z.number(),
    secs: z.number(),
    dsecs: z.number(),
})

export const GpsLatitudePayload = BasePayload.extend({
    degs: z.number(),
    mins: z.number(),
    dmins: z.number(),
    direction: z.string(),
})

export const GpsLongitudePayload = BasePayload.extend({
    degs: z.number(),
    mins: z.number(),
    dmins: z.number(),
    direction: z.string(),
})

export const GpsAltitudePayload = BasePayload.extend({
    altitude: z.number(),
    daltitude: z.number(),
    unit: z.string(),
})

export const GpsInfoPayload = BasePayload.extend({
    num_sats: z.number(),
    quality: z.number(),
})

export const StateEstDataPayload = BasePayload.extend({
    state_id: z.string(),
    data: z.number(),
})

export const StreamStatusPayload = BasePayload.extend({
    total_size: z.number(),
    tx_size: z.number(),
})

export const StreamDataPayload = BasePayload.extend({
    seq_id: z.number(),
    data: z.string(),
})

export const StreamRetryPayload = BasePayload.extend({
    seq_id: z.number(),
})

// ============================================================
// Payload Schema Map
// ============================================================

/**
 * Maps CAN message type name strings to their corresponding
 * payload Zod schema. Use `getPayloadSchema()` for safe lookup.
 */
export const PayloadSchemas = {
    GENERAL_BOARD_STATUS: GeneralBoardStatusPayload,
    RESET_CMD: ResetCmdPayload,
    DEBUG_RAW: DebugRawPayload,
    CONFIG_SET: ConfigSetPayload,
    CONFIG_STATUS: ConfigStatusPayload,
    ACTUATOR_CMD: ActuatorCmdPayload,
    ACTUATOR_ANALOG_CMD: ActuatorAnalogCmdPayload,
    ACTUATOR_STATUS: ActuatorStatusPayload,
    ALT_ARM_CMD: AltArmCmdPayload,
    ALT_ARM_STATUS: AltArmStatusPayload,
    SENSOR_ALTITUDE: SensorAltitudePayload,
    SENSOR_IMU: SensorImuPayload,
    SENSOR_MAG: SensorMagPayload,
    SENSOR_BARO: SensorBaroPayload,
    SENSOR_ANALOG: SensorAnalogPayload,
    GPS_TIMESTAMP: GpsTimestampPayload,
    GPS_LATITUDE: GpsLatitudePayload,
    GPS_LONGITUDE: GpsLongitudePayload,
    GPS_ALTITUDE: GpsAltitudePayload,
    GPS_INFO: GpsInfoPayload,
    STATE_EST_DATA: StateEstDataPayload,
    STREAM_STATUS: StreamStatusPayload,
    STREAM_DATA: StreamDataPayload,
    STREAM_RETRY: StreamRetryPayload,
} as const

// ============================================================
// Types
// ============================================================

export type PayloadMessageType = keyof typeof PayloadSchemas

export type GeneralBoardStatusPayload = z.infer<
    typeof GeneralBoardStatusPayload
>
export type ResetCmdPayload = z.infer<typeof ResetCmdPayload>
export type DebugRawPayload = z.infer<typeof DebugRawPayload>
export type ConfigSetPayload = z.infer<typeof ConfigSetPayload>
export type ConfigStatusPayload = z.infer<typeof ConfigStatusPayload>
export type ActuatorCmdPayload = z.infer<typeof ActuatorCmdPayload>
export type ActuatorAnalogCmdPayload = z.infer<typeof ActuatorAnalogCmdPayload>
export type ActuatorStatusPayload = z.infer<typeof ActuatorStatusPayload>
export type AltArmCmdPayload = z.infer<typeof AltArmCmdPayload>
export type AltArmStatusPayload = z.infer<typeof AltArmStatusPayload>
export type SensorAltitudePayload = z.infer<typeof SensorAltitudePayload>
export type SensorImuPayload = z.infer<typeof SensorImuPayload>
export type SensorMagPayload = z.infer<typeof SensorMagPayload>
export type SensorBaroPayload = z.infer<typeof SensorBaroPayload>
export type SensorAnalogPayload = z.infer<typeof SensorAnalogPayload>
export type GpsTimestampPayload = z.infer<typeof GpsTimestampPayload>
export type GpsLatitudePayload = z.infer<typeof GpsLatitudePayload>
export type GpsLongitudePayload = z.infer<typeof GpsLongitudePayload>
export type GpsAltitudePayload = z.infer<typeof GpsAltitudePayload>
export type GpsInfoPayload = z.infer<typeof GpsInfoPayload>
export type StateEstDataPayload = z.infer<typeof StateEstDataPayload>
export type StreamStatusPayload = z.infer<typeof StreamStatusPayload>
export type StreamDataPayload = z.infer<typeof StreamDataPayload>
export type StreamRetryPayload = z.infer<typeof StreamRetryPayload>

export type AnyParsleyPayload =
    | GeneralBoardStatusPayload
    | ResetCmdPayload
    | DebugRawPayload
    | ConfigSetPayload
    | ConfigStatusPayload
    | ActuatorCmdPayload
    | ActuatorAnalogCmdPayload
    | ActuatorStatusPayload
    | AltArmCmdPayload
    | AltArmStatusPayload
    | SensorAltitudePayload
    | SensorImuPayload
    | SensorMagPayload
    | SensorBaroPayload
    | SensorAnalogPayload
    | GpsTimestampPayload
    | GpsLatitudePayload
    | GpsLongitudePayload
    | GpsAltitudePayload
    | GpsInfoPayload
    | StateEstDataPayload
    | StreamStatusPayload
    | StreamDataPayload
    | StreamRetryPayload

// ============================================================
// Helper
// ============================================================

/**
 * Returns the Zod schema for the given message type name,
 * or `null` if the message type has no known payload schema.
 */
export function getPayloadSchema(
    msgType: string
): (typeof PayloadSchemas)[PayloadMessageType] | null {
    return PayloadSchemas[msgType as PayloadMessageType] ?? null
}
