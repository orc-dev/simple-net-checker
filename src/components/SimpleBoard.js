import React, { useState } from 'react';
import { Button, Space } from 'antd';
import { CUBE_NET_LIB } from '../cubenets/CubeNetLib';

const CELL_SIZE = 50;
const GRID_SIZE = 8;

const SimpleBoard = ({ indices }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selection, setSelection] = useState(null); // 'yes' or 'no'
    const [submitted, setSubmitted] = useState(false);
    const [correctCount, setCorrectCount] = useState(0); // You can update this in your logic
    const [feedback, setFeedback] = useState('unknown');

    const currentCube = CUBE_NET_LIB[indices[currentIndex]];
    const currentMatrix = currentCube.getOutputMatrix();

    const handleSelect = (value) => {
        setSelection(value);
    };

    const handleSubmit = () => {
        if (selection === null) return;

        setSubmitted(true);

        // Placeholder — you can insert your answer checking logic here:
        const expectAnswer = CUBE_NET_LIB[indices[currentIndex]].isValid();
        const userIsCorrect = (selection === expectAnswer);

        if (userIsCorrect) {
            setCorrectCount(prev => prev + 1);
        }
        setFeedback(() => {
            return userIsCorrect ? 'Correct!' : 'Wrong...';
        });
        //console.log(`User selected: ${selection}, Correct: ${userIsCorrect}`);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => prev + 1);
        setSelection(null);
        setSubmitted(false);
    };

    const isLast = currentIndex >= indices.length - 1;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <svg width={CELL_SIZE * GRID_SIZE} height={CELL_SIZE * GRID_SIZE}>
            {currentMatrix.map((row, i) =>
            row.map((val, j) => (
                <rect
                key={`${i}-${j}`}
                x={j * CELL_SIZE}
                y={i * CELL_SIZE}
                width={CELL_SIZE}
                height={CELL_SIZE}
                fill={val === 1 ? '#ADD8E6' : '#e3e3e3'}
                stroke="#fff"
                strokeWidth="1"
                />
            ))
            )}
        </svg>

        <div className="button-board" style={{ marginTop: '1.5rem' }}>
            <Space>
            <Button
                type={selection === true ? 'primary' : 'default'}
                onClick={() => handleSelect(true)}
                disabled={submitted}
            >
                Yes, valid
            </Button>
            <Button
                type={selection === false ? 'primary' : 'default'}
                onClick={() => handleSelect(false)}
                disabled={submitted}
            >
                No, invalid
            </Button>
            <Button
                type="primary"
                disabled={selection === null || submitted}
                onClick={handleSubmit}
            >
                Submit
            </Button>
            </Space>
        </div>

        {/* Feedback Board */}
        {submitted && (
            <div className="feedback-board" style={{ marginTop: '1rem' }}>
            <Space>
                {/* You can replace this with your actual correctness logic */}
                <span>Your answer ({selection ? 'Valid' : 'Invalid'}) is {feedback}</span>
                <span>{/* C/T counter */}{correctCount}/{currentIndex + 1}</span>
                <Button
                    type="default"
                    onClick={handleNext}
                    disabled={isLast}
                >
                Go Next
                </Button>
            </Space>
            </div>
        )}
        </div>
    );
};

export default SimpleBoard;
