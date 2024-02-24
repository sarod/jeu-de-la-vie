import './Grille.css'

const defaultSize = 8;
export function Grille(props: {
  cellules: boolean[][],
  cellSize: number,
  onCellClick: (idxLigne: number, idxColonne: number) => void
}) {
  const cellSize = props.cellSize ||  defaultSize;
  const onCellClick = props.onCellClick;
  return (<table cellSpacing={0} style={{
    borderSpacing: 0,
    borderCollapse: "collapse"
  }}>
    {props.cellules.map((ligne, idx) => <tr key={idx}>
      {ligne.map((e, idxColonne) => {
        const backgroundColor = e ? "white" : "black";
        return <td key={idxColonne}
        onClick={() => onCellClick(idx, idxColonne)}
          style={{ height: cellSize, width: cellSize, border: "solid 1px", backgroundColor: backgroundColor }}
        />
      }
      )}
    </tr>
    )}
  </table>
  );
}
