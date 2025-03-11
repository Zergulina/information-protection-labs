import RetroLabeledPanel from '../../components/RetroLabeledPanel.module.css/RetroLabeledPanel';
import RetroButton from '../../UI/RetroButton/RetroButton';
import classes from './FilePoliticsMatrix.module.css'

type FilePoliticsMatrixProps = {
    filePoliticsMatrix: number[][],
    setFilePolitcsMatrix: (value: number[][]) => void,
    className?: string
}

const FilePoliticsMatrix = ({ filePoliticsMatrix, setFilePolitcsMatrix, className }: FilePoliticsMatrixProps) => {
    const handleGenerateButton = () => {
        let newFilePoliticsMatrix = [...filePoliticsMatrix]
        for (let i = 1; i < newFilePoliticsMatrix.length; i++) {
            for (let j = 0; j < newFilePoliticsMatrix[i].length; j++) {
                newFilePoliticsMatrix[i][j] = Math.floor(Math.random() * 8)
            }
        }
        setFilePolitcsMatrix(newFilePoliticsMatrix)
    }

    return (
        <RetroLabeledPanel label='Матрица доступов' labelZIndex={1} className={`${classes.FilePoliticsMatrix} ${className}`}>
            <div className={classes.FilePoliticsMatrixWrapper}>
                <div className={classes.FilePoliticsMatrixContainer}>
                    {filePoliticsMatrix.length > 0 ?
                        <table className={classes.Table}>
                            <tr>
                                <td />
                                {filePoliticsMatrix[0].map((_, index) => <td>
                                    {index + 1}
                                </td>)}
                            </tr>
                            {filePoliticsMatrix.map((row, rowIndex) => <tr>
                                <td>
                                    {rowIndex}
                                </td>
                                {row.map((el) => <td>
                                    {el}
                                </td>)}
                            </tr>)}
                        </table>
                        : <></>}
                </div>
                <RetroButton onClick={handleGenerateButton} className={classes.Button}>Сгенерировать</RetroButton>
            </div>
        </RetroLabeledPanel>
    );
};

export default FilePoliticsMatrix;