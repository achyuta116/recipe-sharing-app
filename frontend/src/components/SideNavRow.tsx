import React, {SVGProps} from 'react'

interface Props {
	Icon: (props: SVGProps<SVGSVGElement>) => JSX.Element,
	title: string,
	onClick?: () => {}
}

const SideNavRow = ({Icon, title} : Props) => {
  return (
    <div className='space-x-6 items-center rounded-full w-full hover:bg-yellow-50 hover:text-yellow-500 p-2 flex justify-between align center cursor-pointer'>
        <Icon className='h-6 w-6'/>
		<div className='inline text-base font-light lg:text-xl'>{ title }</div>
	</div>
  )
}

export default SideNavRow
