import React from 'react'

export default function Todo(props) {
    return (
        <div className="card w-96 bg-base-100 shadow-xl mx-auto">
            <div className="card-body">
                <h2 className={`card-title ${props.done ? "line-through" : ""}`}>{props.title}</h2>
                <p>{props.description}</p>
                <div className="card-actions justify-end">
                    <button className='btn btn-success' onClick={() => props.onDone(props.id)}>{props.done ? "UnCompleted" : "Completed"}</button>
                    <button className="btn btn-error" onClick={() => props.onDelete(props.id)}>Delete</button>
                </div>
            </div>
        </div>
    )
}
