'use client'

import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'

export default function HeaderMenu() {
  const [isOpen, setOpen] = useState(false) // ハンバーガーメニューの表示・非表示状態
  function handleClick() {
    setOpen(!isOpen)
  }

  return (
    <div className="header flex flex-col bg-sky-600 text-white p-2">
      <div className="userinfo flex justify-end">
        <div>ユーザ名</div>
      </div>
      <div
        onClick={handleClick}
        className="lg:hidden w-10 text-center align-middle bg-sky-900"
      >
        <FontAwesomeIcon
          icon={isOpen ? faXmark : faBars}
          className="h-[20px] p-2"
        />
      </div>
      <nav>
        <ul
          className={`headermenu lg:flex justify-evenly items-end ${isOpen ? 'fixed bg-sky-600 p-10' : 'hidden'}`}
        >
          <li className="p-5 lg:p-2">メニュー1</li>
          <li className="p-5 lg:p-2">メニュー2</li>
          <li className="p-5 lg:p-2">メニュー3</li>
          <li className="p-5 lg:p-2">メニュー4</li>
        </ul>
      </nav>
    </div>
  )
}
