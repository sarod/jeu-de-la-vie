import './Grid.css'

const defaultSize = 8;
export function Grid(props: {
  cellules: boolean[][],
  cellSize: number,
  onCellClick: (idxLigne: number, idxColonne: number) => void
}) {
  const cellSize = props.cellSize || defaultSize;
  const onCellClick = props.onCellClick;
  return (<table className="grid">
    <tbody>
      {props.cellules.map((ligne, idx) => <tr key={idx}>
        {ligne.map((e, idxColonne) => {

          return <td key={idxColonne}
            onClick={() => onCellClick(idx, idxColonne)}
            className={e ? "alive" : "dead"}
            style={{ height: cellSize, width: cellSize }}
          />
        }
        )}
      </tr>
      )}
    </tbody>
  </table>
  );
}
