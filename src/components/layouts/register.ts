import type { App } from 'vue'

/**
 * Register layouts in the app instance
 *
 * @param {App<Element>} app
 */
export const registerLayouts = (app: App<Element>) => {
	const layouts = import.meta.glob<Record<string, { name: string }>>('./*.vue', { eager: true })

	Object.entries(layouts).forEach(([, layout]) => {
		app.component(layout?.default?.name, layout?.default)
	})
}
