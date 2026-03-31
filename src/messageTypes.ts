import { z } from 'zod'

// ============================================================
// Message Priority
// ============================================================

export const MsgPrio = {
    HIGHEST: 0,
    HIGH: 1,
    MEDIUM: 2,
    LOW: 3,
} as const

export const MsgPrioSchema = z.nativeEnum(MsgPrio)
export type MsgPrio = z.infer<typeof MsgPrioSchema>

// ============================================================
// Message Type
// ============================================================

export const MsgType = {
    UNDEFINED: 0x00,
    GENERAL_BOARD_STATUS: 0x01,
    RESET_CMD: 0x02,
    DEBUG_RAW: 0x03,
    CONFIG_SET: 0x04,
    CONFIG_STATUS: 0x05,
    ACTUATOR_CMD: 0x06,
    ACTUATOR_STATUS: 0x07,
    ALT_ARM_CMD: 0x08,
    ALT_ARM_STATUS: 0x09,
    SENSOR_ANALOG16: 0x0a,
    SENSOR_ANALOG32: 0x0b,
    SENSOR_2D_ANALOG24: 0x0c,
    SENSOR_3D_ANALOG16: 0x0d,
    GPS_TIMESTAMP: 0x0e,
    GPS_LATITUDE: 0x0f,
    GPS_LONGITUDE: 0x10,
    GPS_ALTITUDE: 0x11,
    GPS_INFO: 0x12,
    STREAM_STATUS: 0x13,
    STREAM_DATA: 0x14,
    STREAM_RETRY: 0x15,
    LEDS_ON: 0x16,
    LEDS_OFF: 0x17,
} as const

export const MsgTypeSchema = z.nativeEnum(MsgType)
export type MsgType = z.infer<typeof MsgTypeSchema>

// ============================================================
// Board Type ID
// ============================================================

export const BoardTypeId = {
    ANY: 0x00,
    INJECTOR: 0x01,
    CAMERA: 0x02,
    POWER: 0x03,
    LOGGER: 0x04,
    CANARD: 0x05,
    TELEMETRY: 0x06,
    GPS: 0x07,
    ALTIMETER: 0x08,
    ARMING: 0x09,
    PAYLOAD: 0x0a,
    RLCS_GLS: 0x0b,
    RLCS_RELAY: 0x0c,
    DAQ: 0x0d,
} as const

export const BoardTypeIdSchema = z.nativeEnum(BoardTypeId)
export type BoardTypeId = z.infer<typeof BoardTypeIdSchema>

// ============================================================
// Board Instance ID
// ============================================================

export const BoardInstId = {
    ANY: 0x00,
    GROUND: 0x01,
    ROCKET: 0x02,
    SIDE_LOOKING: 0x03,
    DOWN_LOOKING: 0x04,
    RECOVERY: 0x05,
    RA_RAVEN: 0x06,
    RA_STRATOLOGGER: 0x07,
} as const

export const BoardInstIdSchema = z.nativeEnum(BoardInstId)
export type BoardInstId = z.infer<typeof BoardInstIdSchema>

// ============================================================
// Actuator ID
// ============================================================

export const ActuatorId = {
    ACTUATOR_OX_INJECTOR_VALVE: 0x00,
    ACTUATOR_FUEL_INJECTOR_VALVE: 0x01,
    ACTUATOR_ROCKET_CHARGE_ENABLE: 0x02,
    ACTUATOR_PAYLOAD_CHARGE_ENABLE: 0x03,
    ACTUATOR_5V_RAIL_ROCKET: 0x04,
    ACTUATOR_12V_RAIL_ROCKET: 0x05,
    ACTUATOR_TELEMETRY: 0x06,
    ACTUATOR_CAMERA_SIDE_LOOKING: 0x07,
    ACTUATOR_CAMERA_DOWN_LOOKING: 0x08,
    ACTUATOR_CAMERA_RECOVERY: 0x09,
    ACTUATOR_CANARD_PAD_FILTER: 0x0A,
    ACTUATOR_CANARD_5V_OUTPUT: 0x0B,
    ACTUATOR_CANARD_LIPO_ON: 0x0C,
    ACTUATOR_SRAD_ALT_ESTIMATOR_INIT: 0x0D,
    ACTUATOR_SRAD_ALT_GPS_RESET: 0x0E,
    ACTUATOR_CAMERA_CAPTURE: 0x0F,
    ACTUATOR_PAYLOAD_LOGGING_ENABLE: 0x10,
    ACTUATOR_INJECTOR_BOARD_ACTUATOR_1: 0x11,
    ACTUATOR_INJECTOR_BOARD_ACTUATOR_2: 0x12,
    ACTUATOR_RLCS_RELAY_POWER: 0x13,
    ACTUATOR_RLCS_RELAY_SELECT: 0x14,
    ACTUATOR_PAYLOAD_LASER: 0x15,
    ACTUATOR_PAYLOAD_PZT_ARM: 0x16,
} as const

export const ActuatorIdSchema = z.nativeEnum(ActuatorId)
export type ActuatorId = z.infer<typeof ActuatorIdSchema>

// ============================================================
// Actuator State
// ============================================================

export const ActuatorState = {
    ACT_STATE_ON: 0x00,
    ACT_STATE_OFF: 0x01,
    ACT_STATE_UNK: 0x02,
    ACT_STATE_ILLEGAL: 0x03,
} as const

export const ActuatorStateSchema = z.nativeEnum(ActuatorState)
export type ActuatorState = z.infer<typeof ActuatorStateSchema>

// ============================================================
// Altimeter ID
// ============================================================

export const AltimeterId = {
    ALTIMETER_RAVEN: 0x00,
    ALTIMETER_STRATOLOGGER: 0x01,
    ALTIMETER_SRAD: 0x02,
} as const

export const AltimeterIdSchema = z.nativeEnum(AltimeterId)
export type AltimeterId = z.infer<typeof AltimeterIdSchema>

// ============================================================
// Altimeter Arm State
// ============================================================
export const AltArmState = {
    ALT_ARM_STATE_DISARMED: 0x00,
    ALT_ARM_STATE_ARMED: 0x01,
} as const

export const AltArmStateSchema = z.nativeEnum(AltArmState)
export type AltArmState = z.infer<typeof AltArmStateSchema>

// ============================================================
// Analog Sensor ID
// ============================================================
export const AnalogSensorId = {
    SENSOR_5V_VOLT: 0x00,
    SENSOR_5V_CURR: 0x01,
    SENSOR_12V_VOLT: 0x02,
    SENSOR_12V_CURR: 0x03,
    SENSOR_CHARGE_VOLT: 0x04,
    SENSOR_CHARGE_CURR: 0x05,
    SENSOR_BATT_VOLT: 0x06,
    SENSOR_BATT_CURR: 0x07,
    SENSOR_RADIO_CURR: 0x08,
    SENSOR_GPS_CURR: 0x09,
    SENSOR_LOCAL_CURR: 0x0A,
    SENSOR_PT_CHANNEL_1: 0x0B,
    SENSOR_PT_CHANNEL_2: 0x0C,
    SENSOR_PT_CHANNEL_3: 0x0D,
    SENSOR_PT_CHANNEL_4: 0x0E,
    SENSOR_PT_CHANNEL_5: 0x0F,
    SENSOR_PT_CHANNEL_6: 0x10,
    SENSOR_PT_CHANNEL_7: 0x11,
    SENSOR_PT_CHANNEL_8: 0x12,
    SENSOR_PT_CHANNEL_9: 0x13,
    SENSOR_PT_CHANNEL_10: 0x14,
    SENSOR_HALL_CHANNEL_1: 0x15,
    SENSOR_HALL_CHANNEL_2: 0x16,
    SENSOR_HALL_CHANNEL_3: 0x17,
    SENSOR_RA_BATT_VOLT_1: 0x18,
    SENSOR_RA_BATT_VOLT_2: 0x19,
    SENSOR_RA_BATT_CURR_1: 0x1A,
    SENSOR_RA_BATT_CURR_2: 0x1B,
    SENSOR_RA_MAG_VOLT_1: 0x1C,
    SENSOR_RA_MAG_VOLT_2: 0x1D,
    SENSOR_FPS: 0x1E,
    SENSOR_PAYLOAD_LIM_1: 0x1F,
    SENSOR_PAYLOAD_LIM_2: 0x20,
    SENSOR_PAYLOAD_SERVO_DIRECTION: 0x21,
    SENSOR_PAYLOAD_INFRARED: 0x22,
    SENSOR_INJECTOR_BOARD_TEMP_1: 0x23,
    SENSOR_INJECTOR_BOARD_TEMP_2: 0x24,
    SENSOR_INJECTOR_BOARD_TEMP_3: 0x25,
    SENSOR_RLCS_RELAY_OUTPUT_VOLT_A: 0x26,
    SENSOR_RLCS_RELAY_OUTPUT_VOLT_B: 0x27,
    SENSOR_RLCS_RELAY_OUTPUT_CURR_A: 0x28,
    SENSOR_RLCS_RELAY_OUTPUT_CURR_B: 0x29,
    SENSOR_RLCS_RELAY_LIM_VOLT_A: 0x2A,
    SENSOR_RLCS_RELAY_LIM_VOLT_B: 0x2B,
    SENSOR_LOG_WRITTEN_SIZE: 0x2C,
    SENSOR_SD_LOG_FILE_NAME: 0x2D,
    SENSOR_SD_USED: 0x2E,
    SENSOR_SD_FREE: 0x2F,
    SENSOR_FLASH_LOG_FILE_NAME: 0x30,
    SENSOR_FLASH_USED: 0x31,
    SENSOR_FLASH_FREE: 0x32,
    SENSOR_CANARD_CTRL_CMD_ANGLE: 0x33,
    SENSOR_CANARD_CTRL_COEFF_LIFT: 0x34,
    SENSOR_CANARD_MTI630_BARO_0: 0x35,
    SENSOR_CANARD_MTI630_BARO_1: 0x36,
    SENSOR_CANARD_MTI630_EST_ALT: 0x37,
    SENSOR_CANARD_ADXRS649_GYRO: 0x38,
    SENSOR_CANARD_SERVO_ANGLE: 0x39,
    SENSOR_CANARD_SERVO_CURR: 0x3A,
    SENSOR_CANARD_SERVO_TEMP: 0x3B,
    SENSOR_PAYLOAD_SENSOR_CURR_READING: 0x3C,
} as const

export const AnalogSensorIdSchema = z.nativeEnum(AnalogSensorId)
export type AnalogSensorId = z.infer<typeof AnalogSensorIdSchema>

// ============================================================
// DEM 2D Sensor ID
// ============================================================

export const DemSensor2DId = {
    DEM_2D_SENSOR_CANARD_NAV_VEL_ANGLE_VEL_X:0x00,
    DEM_2D_SENSOR_CANARD_NAV_VEL_ANGLE_VEL_Y:0x01,
    DEM_2D_SENSOR_CANARD_NAV_VEL_ANGLE_VEL_Z:0x02,
    DEM_2D_SENSOR_CANARD_MS5611_BARO_TEMP:0x03,
} as const

export const DemSensor2DIdSchema = z.nativeEnum(DemSensor2DId)
export type DemSensor2DId = z.infer<typeof DemSensor2DIdSchema>

// ============================================================
// DEM 3D Sensor ID
// ============================================================

export const DemSensor3DId = {
    DEM_3D_SENSOR_CANARD_NAV_ORIENTATION_QUAT_QX_QY_QZ: 0x00,
    DEM_3D_SENSOR_CANARD_NAV_ORIENTATION_QUAT_QW_ALT_VARNORM: 0x01,
    DEM_3D_SENSOR_CANARD_LSM6DSV32X_ACCEL: 0x02,
    DEM_3D_SENSOR_CANARD_LSM6DSV32X_GYRO: 0x03,
    DEM_3D_SENSOR_CANARD_LSM303AGR_ACCEL: 0x04,
    DEM_3D_SENSOR_CANARD_LSM303AGR_MAG: 0x05,
    DEM_3D_SENSOR_CANARD_MTI630_ACCEL: 0x06,
    DEM_3D_SENSOR_CANARD_MTI630_GYRO: 0x07,
    DEM_3D_SENSOR_CANARD_MTI630_MAG: 0x08,
    DEM_3D_SENSOR_CANARD_MTI630_EST_ORIENTATION: 0x09,
    DEM_3D_SENSOR_CANARD_MTI630_EST_ANGLE_VEL: 0x0A,
    DEM_3D_SENSOR_CANARD_MTI630_EST_VEL: 0x0B,
    DEM_3D_SENSOR_CANARD_ADXL380_ACCEL: 0x0C,
} as const

export const DemSensor3DIdSchema = z.nativeEnum(DemSensor3DId)
export type DemSensor3DId = z.infer<typeof DemSensor3DIdSchema>


// ============================================================
// Board Error Bitfield Offset (bitfield positions)
// ============================================================

export const BoardErrorBitfieldOffset = {
    E_5V_OVER_CURRENT:   0x00,
    E_5V_OVER_VOLTAGE:   0x01,
    E_5V_UNDER_VOLTAGE:  0x02,
    E_12V_OVER_CURRENT:  0x03,
    E_12V_OVER_VOLTAGE:  0x04,
    E_12V_UNDER_VOLTAGE: 0x05,
    E_BATT_OVER_CURRENT: 0x06,
    E_BATT_OVER_VOLTAGE: 0x07,
    E_BATT_UNDER_VOLTAGE:0x08,
    E_MOTOR_OVER_CURRENT:0x09,
    E_IO_ERROR:          0x0A,
    E_FS_ERROR:          0x0B,
    E_WATCHDOG_TIMEOUT:  0x0C,
    E_12V_EFUSE_FAULT:   0x0D,
    E_5V_EFUSE_FAULT:    0x0E,
    E_PT_OUT_OF_RANGE:   0x0F,
}

export const BoardErrorBitfieldOffsetSchema = z.nativeEnum(BoardErrorBitfieldOffset)
export type BoardErrorBitfieldOffset = z.infer<typeof BoardErrorBitfieldOffsetSchema>