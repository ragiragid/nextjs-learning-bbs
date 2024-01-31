import HeaderMenu from '@/app/ui/top/header-menu'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | サンプルシステム',
    default: 'TOP | サンプルシステム',
  },
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="app flex flex-col h-screen">
      <HeaderMenu />
      <div className="main flex items-stretch grow">
        <div className="sidenav flex flex-col bg-sky-400 text-white p-2 w-52 mr-2">
          <div className="p-4">サブメニュー1</div>
          <div className="p-4">サブメニュー2</div>
          <div className="p-4">サブメニュー3</div>
        </div>
        <div className="content bg-white text-black p-4">コンテンツ本体</div>
      </div>
    </div>
  )
}
