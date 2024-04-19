import { WindowPath } from 'src/shared/reducers/settings'
import { Window } from './window'
import { Dispatch } from 'src/shared/reducers'

class WindowManager {
	private dispatch?: Dispatch

	public setDispatch = (dispatch: Dispatch) => {
		this.dispatch = dispatch
	}

	private windows: Record<string, Window> = {}
	public visibleWindows: string[] = []

	private setState = (windows: Record<string, Window>) => {
		this.windows = windows
		this.visibleWindows = Object.keys(windows)
	}

	public updateWindow = (id: string, path: WindowPath) => {
		if (!this.dispatch) return
		const currentWindow = this.windows[id]
		if (currentWindow) return currentWindow.focus()
		const newWindow = new Window(id, path)
		newWindow.setDispatch(this.dispatch)
		newWindow.create()
		this.setState({ ...this.windows, [id]: newWindow })
	}

	public focusWindow = (id: string) => {
		const currentWindow = this.windows[id]
		if (currentWindow) return currentWindow.focus()
	}

	public removeWindow = (id: string) => {
		if (!this.windows[id]) return
		const { [id]: windowToRemove, ...rest } = this.windows
		windowToRemove.destroy()
		this.setState(rest)
	}
}

export const windowManager = new WindowManager()
