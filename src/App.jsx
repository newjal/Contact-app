import Navbar from "./Component/Navbar";
import { FiSearch } from "react-icons/fi";
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./config/firebase";
import ContactCard from "./Component/ContactCard";
import AddAndUpdateContact from "./Component/AddAndUpdateContact";
import useDIsclouse from "./Hooks/useDIsclouse";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NotFoundContant from "./Component/NotFoundContant";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const { isOpen, onClose, onOpen } = useDIsclouse();

  useEffect(() => {
    const getContacts = async () => {
      // try {
      // } catch (error) {
      //   console.warn(error);
      // }
    };
    getContacts();
  }, []);

  const filterContacts = (e) => {
    const value = e.target.value;

    const contactsRef = collection(db, "Contacts");

    onSnapshot(contactsRef, (snapshot) => {
      const contactList = snapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      const filteredContacts = contactList.filter((contact) =>
        contact.name.toLowerCase().includes(value.toLowerCase())
      );

      setContacts(filteredContacts);

      return filteredContacts;
    });
  };

  return (
    <>
      <div className="max-w-[370px] m-auto px-4">
        <Navbar />
        <div className="flex gap-2">
          <div className="flex relative items-center flex-grow">
            <FiSearch className=" absolute ml-1 text-3xl text-white " />
            <input
              onChange={filterContacts}
              type="text"
              className="h-10 flex-grow round-md border border-white bg-transparent pl-9 text-white "
            />
          </div>

          <AiFillPlusCircle
            onClick={onOpen}
            className="text-white text-5xl cursor-pointer"
          />
        </div>

        <div className="mt-4 flex flex-col gap-3">
          {contacts.length <= 0 ? <NotFoundContant /> :contacts.map((contact) => (
            <ContactCard key={contact.id} contact={contact} />
          ))}
        </div>
      </div>
      <AddAndUpdateContact onClose={onClose} isOpen={isOpen} />
      <ToastContainer position="botton-center" />
    </>
  );
};

export default App;
