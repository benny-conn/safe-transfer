import { safeTransfer } from "./safe-transfer"

export default function StateProvider({ children }) {
  return <safeTransfer.Provider>{children}</safeTransfer.Provider>
}
