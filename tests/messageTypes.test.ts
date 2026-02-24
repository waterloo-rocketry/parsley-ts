import { describe, it, expect } from 'vitest'
import {
    MsgPrio,
    MsgPrioSchema,
    MsgType,
    MsgTypeSchema,
    BoardTypeId,
    BoardTypeIdSchema,
    BoardInstId,
    BoardInstIdSchema,
    ActuatorId,
    ActuatorIdSchema,
    ActuatorState,
    ActuatorStateSchema,
    AltimeterId,
    AltimeterIdSchema,
    AltArmState,
    AltArmStateSchema,
    AnalogSensorId,
    AnalogSensorIdSchema,
    DemSensorId,
    DemSensorIdSchema,
    GeneralBoardStatusOffset,
    GeneralBoardStatusOffsetSchema,
    BoardSpecificStatusOffset,
    BoardSpecificStatusOffsetSchema,
} from '../src/messageTypes.js'

describe('MsgPrio', () => {
    it('should have 4 priorities', () => {
        expect(Object.keys(MsgPrio)).toHaveLength(4)
    })

    it('should validate valid priority values', () => {
        expect(MsgPrioSchema.safeParse(0).success).toBe(true)
        expect(MsgPrioSchema.safeParse(1).success).toBe(true)
        expect(MsgPrioSchema.safeParse(2).success).toBe(true)
        expect(MsgPrioSchema.safeParse(3).success).toBe(true)
    })

    it('should reject invalid priority values', () => {
        expect(MsgPrioSchema.safeParse(5).success).toBe(false)
        expect(MsgPrioSchema.safeParse(-1).success).toBe(false)
        expect(MsgPrioSchema.safeParse('HIGHEST').success).toBe(false)
    })

    it('should have correct numeric values', () => {
        expect(MsgPrio.HIGHEST).toBe(0)
        expect(MsgPrio.HIGH).toBe(1)
        expect(MsgPrio.MEDIUM).toBe(2)
        expect(MsgPrio.LOW).toBe(3)
    })
})

describe('MsgType', () => {
    it('should have 23 message types', () => {
        expect(Object.keys(MsgType)).toHaveLength(23)
    })

    it('should validate valid message type values', () => {
        expect(MsgTypeSchema.safeParse(0x00).success).toBe(true)
        expect(MsgTypeSchema.safeParse(0x01).success).toBe(true)
        expect(MsgTypeSchema.safeParse(0x16).success).toBe(true)
    })

    it('should reject invalid message type values', () => {
        expect(MsgTypeSchema.safeParse(0xff).success).toBe(false)
        expect(MsgTypeSchema.safeParse(-1).success).toBe(false)
    })

    it('should have correct hex values', () => {
        expect(MsgType.UNDEFINED).toBe(0x00)
        expect(MsgType.GENERAL_BOARD_STATUS).toBe(0x01)
        expect(MsgType.ACTUATOR_CMD).toBe(0x06)
        expect(MsgType.SENSOR_ANALOG16).toBe(0x0a)
        expect(MsgType.LEDS_OFF).toBe(0x16)
    })
})

describe('BoardTypeId', () => {
    it('should have 14 board types', () => {
        expect(Object.keys(BoardTypeId)).toHaveLength(14)
    })

    it('should validate valid board type values', () => {
        expect(BoardTypeIdSchema.safeParse(0x00).success).toBe(true)
        expect(BoardTypeIdSchema.safeParse(0x0d).success).toBe(true)
    })

    it('should reject invalid board type values', () => {
        expect(BoardTypeIdSchema.safeParse(0x0e).success).toBe(false)
    })

    it('should have correct hex values', () => {
        expect(BoardTypeId.ANY).toBe(0x00)
        expect(BoardTypeId.DAQ).toBe(0x0d)
    })
})

describe('BoardInstId', () => {
    it('should have 9 board instances', () => {
        expect(Object.keys(BoardInstId)).toHaveLength(9)
    })

    it('should validate valid board instance values', () => {
        expect(BoardInstIdSchema.safeParse(0x00).success).toBe(true)
        expect(BoardInstIdSchema.safeParse(0x08).success).toBe(true)
    })

    it('should reject invalid board instance values', () => {
        expect(BoardInstIdSchema.safeParse(0x09).success).toBe(false)
    })
})

describe('ActuatorId', () => {
    it('should have 21 actuator IDs', () => {
        expect(Object.keys(ActuatorId)).toHaveLength(21)
    })

    it('should validate valid actuator ID values', () => {
        expect(ActuatorIdSchema.safeParse(0x00).success).toBe(true)
        expect(ActuatorIdSchema.safeParse(0x14).success).toBe(true)
    })

    it('should reject invalid actuator ID values', () => {
        expect(ActuatorIdSchema.safeParse(0x15).success).toBe(false)
    })

    it('should have correct hex values', () => {
        expect(ActuatorId.VENT).toBe(0x00)
        expect(ActuatorId.PROP_POWER).toBe(0x14)
    })
})

describe('ActuatorState', () => {
    it('should have 4 actuator states', () => {
        expect(Object.keys(ActuatorState)).toHaveLength(4)
    })

    it('should validate valid actuator state values', () => {
        expect(ActuatorStateSchema.safeParse(0x00).success).toBe(true)
        expect(ActuatorStateSchema.safeParse(0x03).success).toBe(true)
    })

    it('should reject invalid actuator state values', () => {
        expect(ActuatorStateSchema.safeParse(0x04).success).toBe(false)
    })
})

describe('AltimeterId', () => {
    it('should have 3 altimeter IDs', () => {
        expect(Object.keys(AltimeterId)).toHaveLength(3)
    })

    it('should validate valid altimeter ID values', () => {
        expect(AltimeterIdSchema.safeParse(0x00).success).toBe(true)
        expect(AltimeterIdSchema.safeParse(0x02).success).toBe(true)
    })

    it('should reject invalid altimeter ID values', () => {
        expect(AltimeterIdSchema.safeParse(0x03).success).toBe(false)
    })
})

describe('AltArmState', () => {
    it('should have 2 arm states', () => {
        expect(Object.keys(AltArmState)).toHaveLength(2)
    })

    it('should validate valid arm state values', () => {
        expect(AltArmStateSchema.safeParse(0x00).success).toBe(true)
        expect(AltArmStateSchema.safeParse(0x01).success).toBe(true)
    })

    it('should reject invalid arm state values', () => {
        expect(AltArmStateSchema.safeParse(0x02).success).toBe(false)
    })
})

describe('AnalogSensorId', () => {
    it('should have 57 sensor IDs', () => {
        expect(Object.keys(AnalogSensorId)).toHaveLength(57)
    })

    it('should validate valid sensor ID values', () => {
        expect(AnalogSensorIdSchema.safeParse(0x00).success).toBe(true)
        expect(AnalogSensorIdSchema.safeParse(0x38).success).toBe(true)
    })

    it('should reject invalid sensor ID values', () => {
        expect(AnalogSensorIdSchema.safeParse(0x39).success).toBe(false)
    })

    it('should have correct hex values for boundary entries', () => {
        expect(AnalogSensorId.PRESSURE_OX_FILL).toBe(0x00)
        expect(AnalogSensorId.VOLTAGE_BUS).toBe(0x38)
    })
})

describe('DemSensorId', () => {
    it('should have 15 DEM sensor IDs', () => {
        expect(Object.keys(DemSensorId)).toHaveLength(15)
    })

    it('should validate valid DEM sensor ID values', () => {
        expect(DemSensorIdSchema.safeParse(0x00).success).toBe(true)
        expect(DemSensorIdSchema.safeParse(0x0e).success).toBe(true)
    })

    it('should reject invalid DEM sensor ID values', () => {
        expect(DemSensorIdSchema.safeParse(0x0f).success).toBe(false)
    })
})

describe('GeneralBoardStatusOffset', () => {
    it('should have 13 status offsets', () => {
        expect(Object.keys(GeneralBoardStatusOffset)).toHaveLength(13)
    })

    it('should validate valid offset values', () => {
        expect(GeneralBoardStatusOffsetSchema.safeParse(0).success).toBe(true)
        expect(GeneralBoardStatusOffsetSchema.safeParse(12).success).toBe(true)
    })

    it('should reject invalid offset values', () => {
        expect(GeneralBoardStatusOffsetSchema.safeParse(13).success).toBe(false)
    })
})

describe('BoardSpecificStatusOffset', () => {
    it('should have 3 status offsets', () => {
        expect(Object.keys(BoardSpecificStatusOffset)).toHaveLength(3)
    })

    it('should validate valid offset values', () => {
        expect(BoardSpecificStatusOffsetSchema.safeParse(0).success).toBe(true)
        expect(BoardSpecificStatusOffsetSchema.safeParse(2).success).toBe(true)
    })

    it('should reject invalid offset values', () => {
        expect(BoardSpecificStatusOffsetSchema.safeParse(3).success).toBe(false)
    })
})
