/*
  Copyright 2017~2022 The Bottos Authors
  This file is part of the Bottos Data Exchange Client
  Created by Developers Team of Bottos.

  This program is free software: you can distribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with Bottos. If not, see <http://www.gnu.org/licenses/>.
*/
exports.messageProtoEncode = (protojs,msg)=>{
    const ProtoMsg = new protojs.Message()

    ProtoMsg.setVersion(msg.version)
    ProtoMsg.setCursorNum(msg.cursor_num)
    ProtoMsg.setCursorLabel(msg.cursor_label)
    ProtoMsg.setLifetime(msg.lifetime)
    ProtoMsg.setSender(msg.sender)
    ProtoMsg.setContract(msg.contract)
    ProtoMsg.setMethod(msg.method)
    ProtoMsg.setParam(Uint8Array.from(msg.param))
    ProtoMsg.setSigAlg(msg.sig_alg)

    return ProtoMsg.serializeBinary();
}

exports.queryProtoEncode = (protojs,msg)=>{
    const ProtoMsg = new protojs.Message()

    ProtoMsg.setUsername(msg.username)
    ProtoMsg.setRandom(msg.random)

    return ProtoMsg.serializeBinary()
}
