import React, { useState } from 'react'
import { IoAdd } from 'react-icons/io5';
import { RiMenu5Fill } from 'react-icons/ri';
import GroupModal from '../../GroupModal';

const ChatsContainerHeader = () => {
    const [isOpenmodal, setIsOpenModal] = useState(false);
  return (
    <div className="flex items-center justify-between p-4 text-gray-500">
        <span className="text-xl font-semibold">Chats</span>
        <div className="flex space-x-3">
          <IoAdd
            className="w-4 h-4 cursor-pointer"
            onClick={() => setIsOpenModal(!isOpenmodal)}
          />
          <RiMenu5Fill className="w-4 h-4 cursor-pointer" />
        </div>
        {isOpenmodal && <GroupModal onClose={() => setIsOpenModal(false)} />}
      </div>
  )
}

export default ChatsContainerHeader