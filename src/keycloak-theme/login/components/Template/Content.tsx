import { DisplayInfo } from "./DisplayInfo"
import { TryAnotherWay } from "./TryAnotherWay"
import { CommonProps } from "./types"
import { Message } from "./Message"

export const Content = ({templateProps: props, getClassName}: CommonProps) => {
	const {children} = props

	return <div id="kc-content">
		<Message getClassName={getClassName} templateProps={props}/>
		{children}
		<TryAnotherWay templateProps={props} getClassName={getClassName}/>
		<DisplayInfo templateProps={props} getClassName={getClassName}/>
	</div>
}