import './category.css';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { db, quizCollection } from '../../firebase/firebase';
import {
    doc,
    getDoc
} from 'firebase/firestore';
import { HOMEPAGE } from '../../routes';

interface OptionsObject {
    one: String,
    two: String,
    three: String
}
interface ElementObject {
    title: String,
    description: String,
    banner: String,
    questions: Array<String>,
    answers: Array<String>,
    options: Array<OptionsObject>
}

export default function Category() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [quizData, setQuizData] = useState<ElementObject[]>([]);

    useEffect(() => {
        if (categoryId) {
            const docRef = doc(db, quizCollection, `${categoryId}`);
            (async function () {
                const docSnap = await getDoc(docRef);
                const data = Object.values(docSnap.data() ?? {})
                setQuizData(data);
            })()
        }
        else {
            navigate(HOMEPAGE)
        }
    }, [categoryId, navigate])

    return <div>
        <h1 className="title categoryTitle xl sb cen sm-s">{categoryId}</h1>
        <h1 className="subtitle lg bd cen">Pick a quiz from these options</h1>
        <div className="category">
            {quizData.map((element: ElementObject) => {
                return <div className="card genre" key={`${element.title}`}>
                    <img
                        src={`${element.banner}`}
                        alt="Banner"
                        className="card__banner"
                    />
                    <section className="content flex-ct-st flex-vertical">
                        <h1 className="card__title">{element.title}</h1>
                        <h1 className="card__subtitle">5 questions</h1>
                        <p className="card__content">
                            {element.description}
                        </p>
                        <button className="btn btn--dark">Play Now</button>
                    </section>
                </div>
            })}

        </div></div>
}