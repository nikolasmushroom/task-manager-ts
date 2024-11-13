import {ChangeEvent, KeyboardEvent, useState} from "react";


export const useAddItemForm = (
    onItemAdded : (title: string) => void
) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            onItemAdded(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return {
        title,
        error,
        changeItemHandler,
        addItemOnKeyUpHandler,
        addItemHandler
    }
}