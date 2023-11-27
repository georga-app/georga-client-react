/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
function CatchContextMenu({
  children,
}: {
  children: React.ReactNode,
}) {
  return (
    <div onContextMenu={e => e.preventDefault()}>
      {children}
    </div>
  )
}

export default CatchContextMenu;
