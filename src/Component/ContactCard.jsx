import { HiOutlineUserCircle } from "react-icons/hi";
import { IoMdTrash } from "react-icons/io";
import { RiEditCircleLine } from "react-icons/ri";
import { db } from "../config/firebase";
import { deleteDoc } from "firebase/firestore";
import { doc } from "firebase/firestore";
import AddAndUpdateContact from "./AddAndUpdateContact";
import useDIsclouse from "../Hooks/useDIsclouse";
import {  toast } from 'react-toastify';
const ContactCard = ({ contact }) => {
  const { isOpen, onClose, onOpen} = useDIsclouse();

  const deleteContact = async (id) => {
    try {
      await deleteDoc(doc(db, "Contacts", id));
      toast.success(" Contact Deleted Sucessfully")
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        key={contact.id}
        className="bg-amber-400 flex justify-between items-center p-2 rounded-lg"
      >
        <div className="flex gap-1">
          <HiOutlineUserCircle className="text-4xl  text-amber-800 " />

          <div>
            <h2 className="text-medium">{contact.name}</h2>
            <p className="text-sm">{contact.email}</p>
          </div>
        </div>
        <div className="flex text-3xl">
          <IoMdTrash
            onClick={() => deleteContact(contact.id)}
            className="text-blue-950 cursor-pointer "
          />
          <RiEditCircleLine  onClick={onOpen} className="cursor-pointer"/>
        </div>
      </div>
      <AddAndUpdateContact contact={contact} isUpdate isOpen={isOpen} onCLose={onClose} />
    </>
  );
};

export default ContactCard;
