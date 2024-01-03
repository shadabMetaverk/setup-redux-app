"use Client"

import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from "../store/action/counterSlice";
import {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from '../store/services/userApi';

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const counter = useSelector((state) => state.rootReducer.counter);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(increment());
  };
  const handleDecriment = () => {
    dispatch(decrement());
  };


  const { data: users, isLoading } = useGetUsersQuery();
  const { data: userById, isLoading: isLoadingUserById } = useGetUserByIdQuery(1);
  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const CreateHandle = async () => {
    let payload = JSON.stringify(
      {
        title: 'test product',
        price: 13.5,
        description: 'lorem ipsum set',
        image: 'https://i.pravatar.cc',
        category: 'electronic'
      }
    )


    try {
      await createUser(payload);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  const EditHandle = async (userId: number) => {
    let payload = JSON.stringify(
      {
          title: 'test product',
          price: 13.5,
          description: 'lorem ipsum set',
          image: 'https://i.pravatar.cc',
          category: 'electronic'
      }
  )
    try {
      await updateUser({ userId, updatedUser: payload });
    } catch (error) {
      console.error(`Error updating user ${userId}:`, error);
    }
  }

  const handleDeleteUser = async (userId) => {
    try {
      await deleteUser(userId);
      users.filter((value) => value.id !== userById);
    } catch (error) {
      console.error(`Error deleting user ${userId}:`, error);
    }
  };

  console.log(users, userById)
  // Add your logic for creating, updating, and deleting users using the mutation hooks.

  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 mb-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">pages/index.tsx</code>
        </p>
        {/* <button onClick={handleDecriment}>Decrement</button>
        <span>{counter}</span> */}
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <button className='bg-rose-600 text-white rounded-sm px-4 py-2' onClick={CreateHandle}>Create New User</button>

        </div>
      </div>

      <div>
        {isLoading && <p>Loading users...</p>}
        {users && (
          <ul className="flex flex-wrap items-start gap-5">
            {users.map((user, key) => (
              <div className='flex-1 p-4 rounded-sm bg-gray-500 text-white' key={key}>
                <li className='flex w-full mb-3 justify-between gap-3'>
                  <button className='bg-rose-400 text-white rounded-sm px-3 py-1' onClick={() => EditHandle(user.id)}>
                    Update
                  </button>{' '}
                  <button className='bg-rose-400 text-white rounded-sm px-3 py-1' onClick={() => handleDeleteUser(user.id)}>Delete</button>

                </li>
                <li className='flex w-full justify-between gap-3 mb-2'>{user?.category}</li>
                <li className='flex w-full justify-between gap-3 mb-2'>{user?.price}</li>
                <li className='flex w-full justify-between gap-3 mb-2'>{user?.title}</li>
              </div>
            ))}
          </ul>
        )}

        {/* {isLoadingUserById && <p>Loading user by ID...</p>}
        {userById && <p>{userById?.username}</p>} */}
      </div>
    </main>
  )
}
