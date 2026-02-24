import { describe, it, expect } from 'vitest'
import {
    GeneralBoardStatusPayload,
    ResetCmdPayload,
    DebugRawPayload,
    ConfigSetPayload,
    ConfigStatusPayload,
    ActuatorCmdPayload,
    ActuatorAnalogCmdPayload,
    ActuatorStatusPayload,
    AltArmCmdPayload,
    AltArmStatusPayload,
    SensorAltitudePayload,
    SensorImuPayload,
    SensorMagPayload,
    SensorBaroPayload,
    SensorAnalogPayload,
    GpsTimestampPayload,
    GpsLatitudePayload,
    GpsLongitudePayload,
    GpsAltitudePayload,
    GpsInfoPayload,
    StateEstDataPayload,
    StreamStatusPayload,
    StreamDataPayload,
    StreamRetryPayload,
    PayloadSchemas,
    getPayloadSchema,
} from '../src/payloads.js'

// ============================================================
// Helper — all payloads require a time field
// ============================================================

const BASE = { time: 1234567890 }

// ============================================================
// Individual Payload Schema Tests
// ============================================================

describe('GeneralBoardStatusPayload', () => {
    it('should accept a valid payload', () => {
        const result = GeneralBoardStatusPayload.safeParse({
            ...BASE,
            general_board_status: 'E_NOMINAL',
            board_error_bitfield: '0000000000000',
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload missing general_board_status', () => {
        const result = GeneralBoardStatusPayload.safeParse({
            ...BASE,
            board_error_bitfield: '0000000000000',
        })
        expect(result.success).toBe(false)
    })

    it('should reject a payload missing time', () => {
        const result = GeneralBoardStatusPayload.safeParse({
            general_board_status: 'E_NOMINAL',
            board_error_bitfield: '0000000000000',
        })
        expect(result.success).toBe(false)
    })
})

describe('ResetCmdPayload', () => {
    it('should accept a valid payload', () => {
        const result = ResetCmdPayload.safeParse({
            ...BASE,
            board_type_id: 'INJECTOR',
            board_inst_id: 'ROCKET',
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload with numeric board_type_id', () => {
        const result = ResetCmdPayload.safeParse({
            ...BASE,
            board_type_id: 1,
            board_inst_id: 'ROCKET',
        })
        expect(result.success).toBe(false)
    })
})

describe('DebugRawPayload', () => {
    it('should accept a valid payload', () => {
        const result = DebugRawPayload.safeParse({
            ...BASE,
            string: 'debug message here',
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload missing string', () => {
        const result = DebugRawPayload.safeParse({ ...BASE })
        expect(result.success).toBe(false)
    })
})

describe('ConfigSetPayload', () => {
    it('should accept a valid payload', () => {
        const result = ConfigSetPayload.safeParse({
            ...BASE,
            board_type_id: 'LOGGER',
            board_inst_id: 'GROUND',
            config_id: 1,
            config_value: 42,
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload with string config_id', () => {
        const result = ConfigSetPayload.safeParse({
            ...BASE,
            board_type_id: 'LOGGER',
            board_inst_id: 'GROUND',
            config_id: 'one',
            config_value: 42,
        })
        expect(result.success).toBe(false)
    })
})

describe('ConfigStatusPayload', () => {
    it('should accept a valid payload', () => {
        const result = ConfigStatusPayload.safeParse({
            ...BASE,
            config_id: 1,
            config_value: 100,
        })
        expect(result.success).toBe(true)
    })
})

describe('ActuatorCmdPayload', () => {
    it('should accept a valid payload', () => {
        const result = ActuatorCmdPayload.safeParse({
            ...BASE,
            actuator: 'VENT',
            cmd_state: 'ON',
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload with numeric cmd_state', () => {
        const result = ActuatorCmdPayload.safeParse({
            ...BASE,
            actuator: 'VENT',
            cmd_state: 0,
        })
        expect(result.success).toBe(false)
    })
})

describe('ActuatorAnalogCmdPayload', () => {
    it('should accept a valid payload', () => {
        const result = ActuatorAnalogCmdPayload.safeParse({
            ...BASE,
            actuator: 'LINAC_EXTENSION',
            cmd_state: 127,
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload with string cmd_state', () => {
        const result = ActuatorAnalogCmdPayload.safeParse({
            ...BASE,
            actuator: 'LINAC_EXTENSION',
            cmd_state: 'ON',
        })
        expect(result.success).toBe(false)
    })
})

describe('ActuatorStatusPayload', () => {
    it('should accept a valid payload', () => {
        const result = ActuatorStatusPayload.safeParse({
            ...BASE,
            actuator: 'INJECTOR',
            curr_state: 'OFF',
            cmd_state: 'ON',
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload missing curr_state', () => {
        const result = ActuatorStatusPayload.safeParse({
            ...BASE,
            actuator: 'INJECTOR',
            cmd_state: 'ON',
        })
        expect(result.success).toBe(false)
    })
})

describe('AltArmCmdPayload', () => {
    it('should accept a valid payload', () => {
        const result = AltArmCmdPayload.safeParse({
            ...BASE,
            alt_id: 'RAVEN',
            alt_arm_state: 'ARMED',
        })
        expect(result.success).toBe(true)
    })
})

describe('AltArmStatusPayload', () => {
    it('should accept a valid payload', () => {
        const result = AltArmStatusPayload.safeParse({
            ...BASE,
            alt_id: 'STRATOLOGGER',
            alt_arm_state: 'DISARMED',
            drogue_v: 3.3,
            main_v: 5.0,
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload missing drogue_v', () => {
        const result = AltArmStatusPayload.safeParse({
            ...BASE,
            alt_id: 'STRATOLOGGER',
            alt_arm_state: 'DISARMED',
            main_v: 5.0,
        })
        expect(result.success).toBe(false)
    })
})

describe('SensorAltitudePayload', () => {
    it('should accept a valid payload', () => {
        const result = SensorAltitudePayload.safeParse({
            ...BASE,
            altitude: 3048.5,
            apogee_state: 'BEFORE_APOGEE',
        })
        expect(result.success).toBe(true)
    })
})

describe('SensorImuPayload', () => {
    it('should accept a valid payload', () => {
        const result = SensorImuPayload.safeParse({
            ...BASE,
            imu_id: 'IMU_1',
            linear_accel: 9.81,
            angular_velocity: 0.5,
        })
        expect(result.success).toBe(true)
    })
})

describe('SensorMagPayload', () => {
    it('should accept a valid payload', () => {
        const result = SensorMagPayload.safeParse({
            ...BASE,
            imu_id: 'IMU_1',
            mag: 48.2,
        })
        expect(result.success).toBe(true)
    })
})

describe('SensorBaroPayload', () => {
    it('should accept a valid payload', () => {
        const result = SensorBaroPayload.safeParse({
            ...BASE,
            imu_id: 'BARO_1',
            pressure: 101325,
            temp: 20.5,
        })
        expect(result.success).toBe(true)
    })
})

describe('SensorAnalogPayload', () => {
    it('should accept a valid payload', () => {
        const result = SensorAnalogPayload.safeParse({
            ...BASE,
            sensor_id: 'PRESSURE_OX_FILL',
            value: 2450.7,
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload with numeric sensor_id', () => {
        const result = SensorAnalogPayload.safeParse({
            ...BASE,
            sensor_id: 0,
            value: 2450.7,
        })
        expect(result.success).toBe(false)
    })
})

describe('GpsTimestampPayload', () => {
    it('should accept a valid payload', () => {
        const result = GpsTimestampPayload.safeParse({
            ...BASE,
            hrs: 14,
            mins: 30,
            secs: 45,
            dsecs: 5,
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload missing dsecs', () => {
        const result = GpsTimestampPayload.safeParse({
            ...BASE,
            hrs: 14,
            mins: 30,
            secs: 45,
        })
        expect(result.success).toBe(false)
    })
})

describe('GpsLatitudePayload', () => {
    it('should accept a valid payload', () => {
        const result = GpsLatitudePayload.safeParse({
            ...BASE,
            degs: 43,
            mins: 28,
            dmins: 1234,
            direction: 'N',
        })
        expect(result.success).toBe(true)
    })
})

describe('GpsLongitudePayload', () => {
    it('should accept a valid payload', () => {
        const result = GpsLongitudePayload.safeParse({
            ...BASE,
            degs: 80,
            mins: 31,
            dmins: 5678,
            direction: 'W',
        })
        expect(result.success).toBe(true)
    })
})

describe('GpsAltitudePayload', () => {
    it('should accept a valid payload', () => {
        const result = GpsAltitudePayload.safeParse({
            ...BASE,
            altitude: 332.5,
            daltitude: 1,
            unit: 'M',
        })
        expect(result.success).toBe(true)
    })
})

describe('GpsInfoPayload', () => {
    it('should accept a valid payload', () => {
        const result = GpsInfoPayload.safeParse({
            ...BASE,
            num_sats: 12,
            quality: 1,
        })
        expect(result.success).toBe(true)
    })
})

describe('StateEstDataPayload', () => {
    it('should accept a valid payload', () => {
        const result = StateEstDataPayload.safeParse({
            ...BASE,
            state_id: 'ALTITUDE',
            data: 3048.5,
        })
        expect(result.success).toBe(true)
    })
})

describe('StreamStatusPayload', () => {
    it('should accept a valid payload', () => {
        const result = StreamStatusPayload.safeParse({
            ...BASE,
            total_size: 4096,
            tx_size: 1024,
        })
        expect(result.success).toBe(true)
    })
})

describe('StreamDataPayload', () => {
    it('should accept a valid payload', () => {
        const result = StreamDataPayload.safeParse({
            ...BASE,
            seq_id: 42,
            data: 'DEADBEEF',
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload with numeric data', () => {
        const result = StreamDataPayload.safeParse({
            ...BASE,
            seq_id: 42,
            data: 12345,
        })
        expect(result.success).toBe(false)
    })
})

describe('StreamRetryPayload', () => {
    it('should accept a valid payload', () => {
        const result = StreamRetryPayload.safeParse({
            ...BASE,
            seq_id: 7,
        })
        expect(result.success).toBe(true)
    })

    it('should reject a payload with string seq_id', () => {
        const result = StreamRetryPayload.safeParse({
            ...BASE,
            seq_id: 'seven',
        })
        expect(result.success).toBe(false)
    })
})

// ============================================================
// PayloadSchemas Map
// ============================================================

describe('PayloadSchemas', () => {
    it('should contain all 24 message types', () => {
        expect(Object.keys(PayloadSchemas)).toHaveLength(24)
    })

    it('should map each key to a Zod schema with a safeParse method', () => {
        for (const [key, schema] of Object.entries(PayloadSchemas)) {
            expect(schema).toBeDefined()
            expect(typeof schema.safeParse).toBe('function')
        }
    })

    it('should have the correct keys', () => {
        const expectedKeys = [
            'GENERAL_BOARD_STATUS',
            'RESET_CMD',
            'DEBUG_RAW',
            'CONFIG_SET',
            'CONFIG_STATUS',
            'ACTUATOR_CMD',
            'ACTUATOR_ANALOG_CMD',
            'ACTUATOR_STATUS',
            'ALT_ARM_CMD',
            'ALT_ARM_STATUS',
            'SENSOR_ALTITUDE',
            'SENSOR_IMU',
            'SENSOR_MAG',
            'SENSOR_BARO',
            'SENSOR_ANALOG',
            'GPS_TIMESTAMP',
            'GPS_LATITUDE',
            'GPS_LONGITUDE',
            'GPS_ALTITUDE',
            'GPS_INFO',
            'STATE_EST_DATA',
            'STREAM_STATUS',
            'STREAM_DATA',
            'STREAM_RETRY',
        ]
        expect(Object.keys(PayloadSchemas).sort()).toEqual(expectedKeys.sort())
    })
})

// ============================================================
// getPayloadSchema Helper
// ============================================================

describe('getPayloadSchema', () => {
    it('should return the correct schema for a known message type', () => {
        const schema = getPayloadSchema('ACTUATOR_CMD')
        expect(schema).toBe(PayloadSchemas.ACTUATOR_CMD)
    })

    it('should return null for an unknown message type', () => {
        const schema = getPayloadSchema('NONEXISTENT_TYPE')
        expect(schema).toBeNull()
    })

    it('should return null for an empty string', () => {
        const schema = getPayloadSchema('')
        expect(schema).toBeNull()
    })

    it('should return a schema that validates correctly', () => {
        const schema = getPayloadSchema('GPS_INFO')
        expect(schema).not.toBeNull()
        const result = schema!.safeParse({
            ...BASE,
            num_sats: 8,
            quality: 2,
        })
        expect(result.success).toBe(true)
    })
})

// ============================================================
// Cross-cutting: every payload requires time
// ============================================================

describe('Base payload time field', () => {
    const allSchemas = Object.entries(PayloadSchemas)

    it.each(allSchemas)(
        '%s should reject a payload missing time',
        (_name, schema) => {
            // Pass an empty object — time is missing
            const result = schema.safeParse({})
            expect(result.success).toBe(false)
        }
    )

    it.each(allSchemas)(
        '%s should reject a payload with string time',
        (_name, schema) => {
            const result = schema.safeParse({ time: 'not a number' })
            expect(result.success).toBe(false)
        }
    )
})
