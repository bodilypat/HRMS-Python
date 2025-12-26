//src/pages/employee/EmployeeDocument.jsx 

import { getEmployeeDocuments, uploadEmployeeDocument } from "../../services/employeeService";

const EmployeeDocument = ({ employeeId }) => {
    const [documents, setDocuments] = useState([]);
    const [file, setFile] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, [employeeId]);

    const fetchDocuments = async () => {
        const response = await getEmployeeDocuments(employeeId);
        setDocuments(response.data);
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        if (file) {
            await uploadEmployeeDocument(employeeId, file);
            fetchDocuments();
        }
    };

    return (
        <div>
            <h2>Employee Documents</h2>
            <form onSubmit={handleUpload}>
                <input type="file" onChange={(e) => setFile(e.target.files[0])} />  
                <button type="submit">Upload Document</button>
            </form>
            <ul>
                {documents.map((doc) => (
                    <li key={doc.id}>
                        <a href={doc.url} target="_blank" rel="noopener noreferrer">{doc.name}</a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default EmployeeDocument;


