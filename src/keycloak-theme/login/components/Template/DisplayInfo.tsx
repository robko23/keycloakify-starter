import { CommonProps } from "./types"

export const DisplayInfo = ({templateProps: props}: CommonProps) => {
	const {displayInfo, infoNode} = props

	if (!displayInfo) {
		return null
	}

	return (
        <div className="kc-info">
            {infoNode}
        </div>
    )
}
