import React, { useState, useEffect } from "react";
import "./App.css";
import { Button } from "./components/Button";

const randomNumber = (start: number, end: number): number => {
	return Math.floor(Math.random() * (end - start + 1)) + start;
};

const makeQuestions = () => {
	const sign = ["+", "-", "x", "/"];

	const question =
		randomNumber(1, 10) +
		` ${sign[randomNumber(0, 3)]} ` +
		randomNumber(1, 10);

	let trueAnswer = eval(question.replace("x", "*"));

	trueAnswer =
		trueAnswer % 1 === 0
			? trueAnswer
			: parseFloat(trueAnswer.toFixed(2));

	const isTrue = randomNumber(1, 10) % 2;

	return { question, trueAnswer, isTrue };
};

function shuffleArray<T>(array: T[]): T[] {
	let m = array.length,
		t: T,
		i: number;

	while (m) {
		i = Math.floor(Math.random() * m--);

		t = array[m];
		array[m] = array[i];
		array[i] = t;
	}

	//@ts-ignore
	return array.map((item) => {
		if (typeof item === "number") {
			return item % 1 === 0
				? item
				: parseFloat(item.toFixed(2));
		}
		return item;
	});
}

const generateOptions = (correctAnswer: number) => {
	const options = new Set<number>();
	options.add(correctAnswer);

	while (options.size < 4) {
		const wrongAnswer = correctAnswer + randomNumber(-5, 5);
		if (wrongAnswer !== correctAnswer) {
			options.add(wrongAnswer);
		}
	}

	let arr = Array.from(options);

	let shuffArr = shuffleArray(arr);

	return Array.from(shuffArr);
};

function App() {
	const [count, setCount] = useState(1);
	const [trueCount, setTrueCount] = useState(0);
	const [falseCount, setFalseCount] = useState(0);
	const [questions, setQuestions] = useState(
		new Array(10).fill(0).map(() => makeQuestions())
	);

	const question = questions[count - 1];

	const [options, setOptions] = useState<number[]>([]);

	useEffect(() => {
		if (question) {
			setOptions(generateOptions(question.trueAnswer));
		}
	}, [question]);

	const checkAnswer = (value: number) => {
		if (question && question.trueAnswer === value) {
			setTrueCount(trueCount + 1);
			console.log(true);
		} else {
			setFalseCount(falseCount + 1);
			console.log(false);
		}

		setCount(count + 1);
	};

	const startGame = () => {
		setQuestions(
			new Array(10).fill(0).map(() => makeQuestions())
		);
		setCount(1);
		setFalseCount(0);
		setTrueCount(0);
	};

	return (
		<div className="flex justify-center items-center bg-slate-200 h-[100vh]">
			<div className="bg-gray-700 min-w-[300px] text-center rounded-md p-5">
				{question ? (
					<>
						<p className="text-white">
							{count} / {questions.length}
						</p>
						<p className="text-4xl my-14 text-white">
							{question.question} = {" ?"}
						</p>
						<div className="grid grid-cols-2 gap-4 my-4">
							{options.map((item, index) => (
								<Button
									className="bg-gray-800 text-center"
									key={index}
									onClick={() => checkAnswer(item)}
								>
									{item}
								</Button>
							))}
						</div>
					</>
				) : (
					<div>
						<p className="flex font-bold justify-center gap-10 my-4">
							<span className="text-green-600">
								{trueCount}
							</span>
							<span className="text-red-600">
								{falseCount}
							</span>
						</p>
						<p className="font-bold text-white text-4xl mt-8">
							{(trueCount / questions.length) * 100} %
						</p>
						<Button
							onClick={startGame}
							className="my-10 px-6 text-white bg-gray-800"
						>
							Qaytadan o'ynash
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

export default App;
