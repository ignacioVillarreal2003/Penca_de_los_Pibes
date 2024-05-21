
//////////////////////////////////////////* Operaciones //////////////////////////////////////////*
/*
async function getRoomType(roomCode: string): Promise<string | undefined> {
    try {
        const result = await RoomType.findOne({ roomCode: { $eq: roomCode } });
        if (result) {
            const roomType: string = result.roomType;
            return roomType;
        } else {
            return undefined;
        }
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

async function postRoomType(roomCode: string, roomType: string): Promise<boolean> {
    try {
        const type = new RoomType({
            roomCode: roomCode,
            roomType: roomType,
        });
        const result = await type.save();
        if (result) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}

module.exports = { 
    getRoomType,
    postRoomType, 
}

*/