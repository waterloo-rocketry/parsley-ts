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
    SENSOR_DEM_ANALOG16: 0x0c,
    GPS_TIMESTAMP: 0x0d,
    GPS_LATITUDE: 0x0e,
    GPS_LONGITUDE: 0x0f,
    GPS_ALTITUDE: 0x10,
    GPS_INFO: 0x11,
    STREAM_STATUS: 0x12,
    STREAM_DATA: 0x13,
    STREAM_RETRY: 0x14,
    LEDS_ON: 0x15,
    LEDS_OFF: 0x16,
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
    PAYLOAD: 0x03,
    SIDE_LOOKING: 0x04,
    DOWN_LOOKING: 0x05,
    RECOVERY: 0x06,
    RA_RAVEN: 0x07,
    RA_STRATOLOGGER: 0x08,
} as const

export const BoardInstIdSchema = z.nativeEnum(BoardInstId)
export type BoardInstId = z.infer<typeof BoardInstIdSchema>

// ============================================================
// Actuator ID
// ============================================================

export const ActuatorId = {
    VENT: 0x00,
    INJECTOR: 0x01,
    FILL_DUMP: 0x02,
    IGNITION_PRIMARY: 0x03,
    IGNITION_SECONDARY: 0x04,
    OX_DISCONNECT: 0x05,
    GEN_PURGE: 0x06,
    OX_PURGE: 0x07,
    FUEL_PURGE: 0x08,
    FUEL_AND_OX_LINE: 0x09,
    GEN_PURGE_LINE: 0x0a,
    PAYLOAD_PURGE_LINE: 0x0b,
    SUPPLY_DUMP_LINE: 0x0c,
    OX_FILL_LINE: 0x0d,
    FUEL_FILL_LINE: 0x0e,
    LINAC_EXTENSION: 0x0f,
    LINAC_RETRACTION: 0x10,
    NOS_FILL_LINE: 0x11,
    NOS_FILL_DUMP_LINE: 0x12,
    NOS_FLIGHT_VENT: 0x13,
    PROP_POWER: 0x14,
} as const

export const ActuatorIdSchema = z.nativeEnum(ActuatorId)
export type ActuatorId = z.infer<typeof ActuatorIdSchema>

// ============================================================
// Actuator State
// ============================================================

export const ActuatorState = {
    ON: 0x00,
    OFF: 0x01,
    UNK: 0x02,
    ILLEGAL: 0x03,
} as const

export const ActuatorStateSchema = z.nativeEnum(ActuatorState)
export type ActuatorState = z.infer<typeof ActuatorStateSchema>

// ============================================================
// Altimeter ID
// ============================================================

export const AltimeterId = {
    RAVEN: 0x00,
    STRATOLOGGER: 0x01,
    SRAD: 0x02,
} as const

export const AltimeterIdSchema = z.nativeEnum(AltimeterId)
export type AltimeterId = z.infer<typeof AltimeterIdSchema>

// ============================================================
// Altimeter Arm State
// ============================================================

export const AltArmState = {
    DISARMED: 0x00,
    ARMED: 0x01,
} as const

export const AltArmStateSchema = z.nativeEnum(AltArmState)
export type AltArmState = z.infer<typeof AltArmStateSchema>

// ============================================================
// Analog Sensor ID
// ============================================================

export const AnalogSensorId = {
    PRESSURE_OX_FILL: 0x00,
    PRESSURE_OX_FLOW: 0x01,
    PRESSURE_FUEL: 0x02,
    PRESSURE_OX_TANK_1: 0x03,
    PRESSURE_OX_TANK_2: 0x04,
    PRESSURE_CC: 0x05,
    TEMPERATURE_OX_FILL: 0x06,
    TEMPERATURE_OX_FLOW: 0x07,
    TEMPERATURE_OX_TANK_1: 0x08,
    TEMPERATURE_OX_TANK_2: 0x09,
    TEMPERATURE_FUEL_TANK: 0x0a,
    TEMPERATURE_CC: 0x0b,
    CURRENT_ENGINE_IGNITOR_1: 0x0c,
    CURRENT_ENGINE_IGNITOR_2: 0x0d,
    CURRENT_BRB: 0x0e,
    VOLTAGE_BRB: 0x0f,
    ACCELERATION_X: 0x10,
    ACCELERATION_Y: 0x11,
    ACCELERATION_Z: 0x12,
    GYROSCOPE_X: 0x13,
    GYROSCOPE_Y: 0x14,
    GYROSCOPE_Z: 0x15,
    MAGNETIC_X: 0x16,
    MAGNETIC_Y: 0x17,
    MAGNETIC_Z: 0x18,
    PRESSURE_BARO: 0x19,
    TEMPERATURE_BARO: 0x1a,
    ALTITUDE_GPS: 0x1b,
    LATITUDE_GPS: 0x1c,
    LONGITUDE_GPS: 0x1d,
    VOLTAGE_BATTERY_1: 0x1e,
    VOLTAGE_BATTERY_2: 0x1f,
    TEMPERATURE_AMBIENT: 0x20,
    STRAIN_GAUGE_1: 0x21,
    STRAIN_GAUGE_2: 0x22,
    LOAD_CELL_1: 0x23,
    LOAD_CELL_2: 0x24,
    DISPLACEMENT_1: 0x25,
    DISPLACEMENT_2: 0x26,
    CURRENT_MOTOR_1: 0x27,
    CURRENT_MOTOR_2: 0x28,
    VOLTAGE_MOTOR_1: 0x29,
    VOLTAGE_MOTOR_2: 0x2a,
    RPM_MOTOR_1: 0x2b,
    RPM_MOTOR_2: 0x2c,
    TEMPERATURE_MOTOR_1: 0x2d,
    TEMPERATURE_MOTOR_2: 0x2e,
    PRESSURE_NOS_SUPPLY: 0x2f,
    PRESSURE_NOS_INJECT: 0x30,
    TEMPERATURE_NOS_SUPPLY: 0x31,
    TEMPERATURE_NOS_INJECT: 0x32,
    MASS_NOS_SUPPLY: 0x33,
    MASS_NOS_INJECT: 0x34,
    PRESSURE_PNEUMATICS: 0x35,
    PRESSURE_FUEL_TANK: 0x36,
    CURRENT_PAYLOAD: 0x37,
    VOLTAGE_BUS: 0x38,
} as const

export const AnalogSensorIdSchema = z.nativeEnum(AnalogSensorId)
export type AnalogSensorId = z.infer<typeof AnalogSensorIdSchema>

// ============================================================
// DEM Sensor ID
// ============================================================

export const DemSensorId = {
    VALVE_OX_FILL: 0x00,
    VALVE_OX_FLOW: 0x01,
    VALVE_FUEL: 0x02,
    VALVE_OX_PURGE: 0x03,
    VALVE_FUEL_PURGE: 0x04,
    VALVE_GEN_PURGE: 0x05,
    VALVE_VENT: 0x06,
    SWITCH_FILL_DISCONNECT: 0x07,
    SWITCH_OX_DISCONNECT: 0x08,
    VALVE_NOS_FILL: 0x09,
    VALVE_NOS_FILL_DUMP: 0x0a,
    VALVE_NOS_FLIGHT_VENT: 0x0b,
    VALVE_SUPPLY_DUMP: 0x0c,
    VALVE_PROP_POWER: 0x0d,
    VALVE_LINAC: 0x0e,
} as const

export const DemSensorIdSchema = z.nativeEnum(DemSensorId)
export type DemSensorId = z.infer<typeof DemSensorIdSchema>

// ============================================================
// General Board Status Offset (bitfield positions)
// ============================================================

export const GeneralBoardStatusOffset = {
    E_5V_OVER_CURRENT: 0,
    E_5V_OVER_VOLTAGE: 1,
    E_5V_UNDER_VOLTAGE: 2,
    E_BATT_OVER_CURRENT: 3,
    E_BATT_OVER_VOLTAGE: 4,
    E_BATT_UNDER_VOLTAGE: 5,
    E_12V_OVER_CURRENT: 6,
    E_12V_OVER_VOLTAGE: 7,
    E_12V_UNDER_VOLTAGE: 8,
    E_BUS_OVER_CURRENT: 9,
    E_BUS_OVER_VOLTAGE: 10,
    E_BUS_UNDER_VOLTAGE: 11,
    E_BOARD_OVER_TEMP: 12,
} as const

export const GeneralBoardStatusOffsetSchema = z.nativeEnum(
    GeneralBoardStatusOffset
)
export type GeneralBoardStatusOffset = z.infer<
    typeof GeneralBoardStatusOffsetSchema
>

// ============================================================
// Board Specific Status Offset (bitfield positions)
// ============================================================

export const BoardSpecificStatusOffset = {
    E_BUS_OVER_CURRENT: 0,
    E_BUS_OVER_VOLTAGE: 1,
    E_BUS_UNDER_VOLTAGE: 2,
} as const

export const BoardSpecificStatusOffsetSchema = z.nativeEnum(
    BoardSpecificStatusOffset
)
export type BoardSpecificStatusOffset = z.infer<
    typeof BoardSpecificStatusOffsetSchema
>
