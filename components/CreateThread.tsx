'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth, useUser } from '@clerk/nextjs'

interface CreateThreadProps {
    onCreate: (thread: Thread | QNAThread) => void
}

const CreateThread = ({ onCreate }: CreateThreadProps): JSX.Element => {
    const { isSignedIn } = useAuth();
    const { user } = useUser();
    const router = useRouter();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState<'Regular' | 'QNA'>('Regular');
    const [tags, setTags] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState({ title: '', description: '' });
    const [confirmationMessage, setConfirmationMessage] = useState('');

    if (!isSignedIn) {
        return (
            <div className="flex items-center justify-center p-20">
                <p className="text-center text-2xl">You must be signed in to create a thread.</p>
            </div>
        );
    }

    const validateInput = (value: string, field: 'title' | 'description') => {
        setErrors(prevErrors => ({
            ...prevErrors,
            [field]: value ? '' : `${field} is required`
        }));
    };

    const handleSubmit = () => {
        validateInput(title, 'title');
        validateInput(description, 'description');

        if (!title || !description) {
            return;
        }

        const newThread: Thread | QNAThread = {
            id: Math.floor(Math.random() * 1000),
            title,
            description,
            username: user?.fullName || user?.emailAddresses[0].emailAddress || 'Anonymous',
            creationDate: new Date().toLocaleString([], { year: '2-digit', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }),
            comments: [],
            type,
            tags: tags.map((tag, index) => ({ id: index, name: tag })),
            ...(type === 'QNA' && { isAnswered: false })
        };

        const existingThreads = JSON.parse(localStorage.getItem('threads') || '[]');
        const updatedThreads = [...existingThreads, newThread];
        localStorage.setItem('threads', JSON.stringify(updatedThreads));

        onCreate(newThread);

        setConfirmationMessage('Thread created successfully');
        setTimeout(() => {
            setConfirmationMessage('');
        }, 5000);

        setTitle('');
        setDescription('');
        setTags([]);
        setTagInput('');
        setErrors({ title: '', description: '' });
    };

    const handleClick = () => {
        handleSubmit();
        if (!errors.title && !errors.description) {
            router.push('/');
        }
        setTags([])
    };

    const handleAddTag = () => {
        if (tagInput.trim() && !tags.includes(tagInput.trim())) {
            setTags([...tags, tagInput.trim()]);
            setTagInput('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(tags.filter(tag => tag !== tagToRemove));
    };

    return (
        <div className="flex items-center justify-center m-8 text-black">
            <div className="w-full max-w-lg p-6 bg-white border rounded-xl shadow-lg space-y-4">
                <div>
                    <h2 className="text-center text-3xl font-bold text-gray-800">
                        Create a Thread
                    </h2>
                    {confirmationMessage && <p className='text-center text-green-500 mb-4'>{confirmationMessage}</p>}
                </div>
                <div className='flex flex-col space-y-4'>
                    <div>
                        <input
                            className='rounded border border-gray-300'
                            value={title}
                            placeholder='Title'
                            onChange={(e) => {
                                setTitle(e.target.value);
                                setConfirmationMessage('');
                            }}
                        />
                    </div>
                    <div>
                        <textarea
                            className='rounded border border-gray-300'
                            value={description}
                            placeholder='Description'
                            onChange={(e) => {
                                setDescription(e.target.value);
                                setConfirmationMessage('');
                            }}
                        />
                    </div>
                    <div>
                        <select
                            className='rounded border border-gray-300'
                            value={type}
                            onChange={(e) => setType(e.target.value as 'Regular' | 'QNA')}
                        >
                            <option value='Regular'>Regular</option>
                            <option value='QNA'>QNA</option>
                        </select>
                    </div>
                    <div>
                        <input
                            className='rounded border border-gray-300'
                            value={tagInput}
                            placeholder='Add a tag'
                            onChange={(e) => setTagInput(e.target.value)}
                        />
                        <button
                            className='bg-gray-600 text-white hover:bg-gray-700 rounded w-full my-4'
                            onClick={handleAddTag}
                        >
                            Add Tag
                        </button>
                        <div className='flex flex-wrap space-x-2'>
                            {tags.map(tag => (
                                <span key={tag} className='bg-gray-200 rounded px-2 py-1'>
                                    {tag}
                                    <button onClick={() => handleRemoveTag(tag)} className='ml-2 text-red-500'>x</button>
                                </span>
                            ))}
                        </div>
                    </div>
                    <button
                        className='bg-gray-600 text-white hover:bg-gray-700 rounded w-full my-4'
                        onClick={handleClick}
                    >
                        Create
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreateThread;