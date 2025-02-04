import { useEffect, useState } from "react";

const DataTable = () => {
    const [formData, setFormData] = useState({ name: "", gender: "", age: "" });
    const [data, setData] = useState([]);
    const [editId, setEditId] = useState(null);
    const [searchName, setSearchName] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    //pagination
    const itemsPerPage = 5;
    const lastItemIndex = currentPage * itemsPerPage;
    const firstItemIndex = lastItemIndex - itemsPerPage;

    let filteredItem = data
    .filter((item) =>
        item.name.toLowerCase().includes(searchName.toLowerCase()) // Filtering happens here
    )
    const filterData = filteredItem.slice(firstItemIndex, lastItemIndex); // Pagination happens after filterin

    useEffect(()=>{
        setCurrentPage(1)
    },[searchName])

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleAdd = () => {
        if (formData.name && formData.gender && formData.age) {
            const newItem = {
                id: Date.now(),
                name: formData.name,
                gender: formData.gender,
                age: formData.age,
            };
            setData([...data, newItem]);
            setFormData({ name: "", gender: "", age: "" });
        }
    };

    const handleDelete = (id) => {
        if(filterData.length === 1 && currentPage !== 1){
            setCurrentPage(currentPage-1);
        }
    };

    const handleSearchName = (e) => {
        setSearchName(e.target.value);
    };

    const handleEditChange = (e, id) => {
        const { name, value } = e.target;
        setData((prevData) =>
            prevData.map((item) =>
                item.id === id ? { ...item, [name]: value } : item
            )
        );
    };

    const handleSave = () => {
        setEditId(null);
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    return (
        <div className="container">
            <div className="info-container">
                <div className="input-lists">
                    <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleInputChange} />
                    <input type="text" name="gender" placeholder="Gender" value={formData.gender} onChange={handleInputChange} />
                    <input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleInputChange} />
                </div>
                <button className="add" onClick={handleAdd}>Add</button>
            </div>
            <div className="search-container">
                <input type="text" className="search-input" placeholder="Search by name" value={searchName} onChange={handleSearchName} />
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Gender</th>
                            <th>Age</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterData.map((item) => (
                            <tr key={item.id}>
                                <td className="table-cell">
                                    {editId === item.id ? (
                                        <input type="text" name="name" value={item.name} onChange={(e) => handleEditChange(e, item.id)} />
                                    ) : (
                                        <span>{item.name}</span>
                                    )}
                                </td>
                                <td className="table-cell">
                                    {editId === item.id ? (
                                        <input type="text" name="gender" value={item.gender} onChange={(e) => handleEditChange(e, item.id)} />
                                    ) : (
                                        <span>{item.gender}</span>
                                    )}
                                </td>
                                <td className="table-cell">
                                    {editId === item.id ? (
                                        <input type="number" name="age" value={item.age} onChange={(e) => handleEditChange(e, item.id)} />
                                    ) : (
                                        <span>{item.age}</span>
                                    )}
                                </td>
                                <td className="table-cell actions">
                                    {editId === item.id ? (
                                        <button className="save" onClick={handleSave}>Save</button>
                                    ) : (
                                        <button className="edit" onClick={() => setEditId(item.id)}>Edit</button>
                                    )}
                                    <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="pagination">
                    {Array.from({length:Math.ceil(data.length / itemsPerPage)}, (_, index) => (
                        <button key={index+1} onClick={()=>paginate(index+1)} style={{backgroundColor:currentPage === index+1 && "rgb(195, 101, 194)", color:'black'}}>{index + 1}</button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DataTable;
