import { useEffect, useState } from "react";

type Food = {
    id: number;
    nama: string;
    deskripsi: string;
}

export function FoodList() {
    const [foods, setFood] = useState<Food[]>([]);
    const [titleInput, setTitleInput] = useState(''); 

    const reloadFood = async () => {
        try {
            const response = await fetch('http://localhost:5173/api/list-menu');
            
            if (!response.ok) {
                console.error("Failed to fetch");
                return;
            }
            
            const data = await response.json();
            setFood(data.records);
        } catch (error) {
            console.error("Error connecting to server", error);
        }
    };

    useEffect(() => {
        reloadFood();
    }, []);

    const addFood = async () => {
        if (!titleInput) return; 

        try {
            const response = await fetch('http://localhost:5173/api/list-menu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify({
                    title: titleInput,
                    content: "Default content",
                })
            });

            if (response.status != 200) {
                await reloadFood(); 
                setTitleInput('');
            } else {
                alert("Gagal menyimpan post");
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div> 
            <h4> Foods: {foods.length} </h4> 
            <ul>
                {foods.map((food) => (
                    <li key={food.id}>
                        <b>{food.nama}</b> - {food.deskripsi} (ID: {food.id})
                    </li>
                ))}
            </ul>

            <div style={{ marginTop: '20px', borderTop: '1px solid #ccc', paddingTop: '10px'}}>
                <h4>Tambah Menu</h4>
                <input 
                    type="text" 
                    value={titleInput} 
                    onChange={e => setTitleInput(e.target.value)}
                    placeholder="Enter post title..."
                />
                <button onClick={addFood} style={{ marginLeft: '10px' }}> 
                    Tambah
                </button>
            </div>
        </div>
    );
}