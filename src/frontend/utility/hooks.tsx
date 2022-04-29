import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from '../store'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db, quizCollection } from '../firebase/firebase';
import {
    doc,
    getDoc
} from 'firebase/firestore';
import { ElementObject } from './interface';
import { HOMEPAGE } from '../routes';
import { userActions } from '../store/userSlice';

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useCategoryId = (categoryId: String) => {
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<ElementObject[]>([]);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (categoryId) {
            const docRef = doc(db, quizCollection, `${categoryId}`);
            (async function () {
                const docSnap = await getDoc(docRef);
                const data = Object.values(docSnap.data() ?? {})
                setQuizData(data);
                dispatch(userActions.getCategoryQuiz(data));
            })()
        }
        else {
            navigate(HOMEPAGE)
        }
    }, [categoryId, navigate, dispatch])

    return quizData;
}

export const useQuizId = (quizId: String) => {
    const { categoryQuiz } = useAppSelector(state => state.users);
    return categoryQuiz.find((item: ElementObject) => item.id === quizId);
}

