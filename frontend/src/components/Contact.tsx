import axios from "axios";
import { BACKEND_URL } from "../config";
import { useState } from "react";
import { Loading } from "./Loading";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const Contact = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handler = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        try {
            await axios.post(`${BACKEND_URL}/submit`, {
                name,
                email,
                message
            });

            toast.success("Message sent successfully!");
        } catch (error) {
            console.error("Error Submitting the Form: ", error);
            toast.error("Error submitting the form. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    

    return (
        <div className="p-4 mx-auto max-w-xl bg-white font-[sans-serif]">
            <h1 className="text-3xl text-gray-800 font-extrabold text-center">Contact us</h1>
            <form className="mt-8 space-y-4" onSubmit={handler}>
                <input type='text' placeholder='Name' onChange={(e) => { setName(e.target.value) }}
                    className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                <input type='email' placeholder='Email' onChange={(e) => { setEmail(e.target.value) }}
                    className="w-full rounded-md py-3 px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm outline-blue-500" />
                <textarea placeholder='Message' rows={6} onChange={(e) => { setMessage(e.target.value) }}
                    className="w-full rounded-md px-4 text-gray-800 bg-gray-100 focus:bg-transparent text-sm pt-3 outline-blue-500"></textarea>
                <button type='submit'
                    className="text-white flex justify-center bg-blue-500 hover:bg-blue-600 tracking-wide rounded-md text-sm px-4 py-3 w-full">
                    {loading ? <Loading /> : "Send"}
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}
