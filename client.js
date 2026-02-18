import axios from "axios";

const API = "http://localhost:3000/tasks";

const run = async () => {
    try {
        console.log("Creating Task...");
        await axios.post(API, { title: "Learn Axios" });
        await axios.post(API, { title: "Learn MongoDB" });

        console.log("Getting Tasks...");
        const res1 = await axios.get(API);
        console.log(res1.data);

        console.log("Updating Task...");
        await axios.put(`${API}/1`, { completed: true });

        const res2 = await axios.get(API);
        console.log(res2.data);

        console.log("Deleting Task...");
        await axios.delete(`${API}/1`);

        const res3 = await axios.get(API);
        console.log(res3.data);

    } catch (error) {
        console.error(error.message);
    }
};

run();
