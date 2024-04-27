import React, { useEffect, useState } from "react";

const TextForm = () => {
	const [text, setText] = useState("");
	const [textError, setTextError] = useState("");
	const [speech, setSpeech] = useState("");

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!text) {
			setTextError("Required");
			return;
		}

		try {
			const response = await fetch(
				`http://api.voicerss.org/?key=${import.meta.env.VITE_API_KEY}&hl=en-us&src=${text}`
			);
			const data = await response.blob();
			const speechUrl = URL.createObjectURL(data);
			setSpeech(speechUrl);
		} catch (error) {
			console.log("Error converting text: ", error);
		}
	};

	useEffect(() => {
		setSpeech("");
	}, [text])

	return (
		<form
			onSubmit={e => handleSubmit(e)}
			className="w-[30vw] p-5 rounded-lg flex flex-col gap-2 bg-customGray text-customWhite"
		>
			<label htmlFor="textToSpeech" className="text-sm">
				Text to speech
			</label>
			<textarea
				name="textToSpeech"
				id="textToSpeech"
				rows="4"
				value={text}
				onChange={(e) => {
					setText(e.target.value);
					setTextError("");
				}}
				className="p-3 text-customBlack outline-none"
			></textarea>
			{textError && <p className="text-red-500 text-xs">{textError}</p>}
			<input
				type="submit"
				value="Convert"
				className="w-max py-2 px-5 mt-2 font-semibold cursor-pointer rounded-sm bg-blue-500"
			/>

			<div className="flex flex-col gap-2 border-t pt-3 mt-2">
				<h3 className="font-semibold">Output:</h3>
				{speech && <audio controls autoPlay className="w-full">
					<source src={speech} type="audio/mpeg" />
					Your browser does not support the audio element.
				</audio>}
			</div>
		</form>
	);
};

export default TextForm;
