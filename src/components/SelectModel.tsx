"use client";

import { cacheGet, cacheSet } from "@/server/cache/kv";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "./ui/select";

const models = [
	{
		value: "@cf/meta/llama-3.2-1b-instruct",
		label: "1b: llama-3.2-1b-instruct",
	},
	{
		value: "@cf/meta/llama-3.2-3b-instruct",
		label: "3b: llama-3.2-3b-instruct",
	},
	{
		value: "@cf/meta/llama-3-8b-instruct",
		label: "8b: llama-3-8b-instruct",
	},
	{
		value: "@cf/meta/llama-3.1-8b-instruct",
		label: "8b: llama-3.1-8b-instruct",
	},
	{
		value: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
		label: "70b: llama-3.3-70b-instruct-fp8-fast",
	},
	{
		value: "@cf/mistral/mistral-7b-instruct-v0.1",
		label: "7b: mistral-7b-instruct-v0.1",
	},
	{
		value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
		label: "32B: deepseek-r1-distill-qwen-32b",
	},
	{
		value: "@hf/thebloke/deepseek-coder-6.7b-base-awq",
		label: "7B: deepseek-coder-6.7b-base-awq",
	},
	{
		value: "@hf/thebloke/deepseek-coder-6.7b-instruct-awq",
		label: "7B: deepseek-coder-6.7b-instruct-awq",
	},
	{
		value: "@cf/defog/sqlcoder-7b-2",
		label: "7B: sqlcoder-7b-2",
	},
	{
		value: "@cf/meta/m2m100-1.2b",
		label: "2B: m2m100-1.2b (translation)",
	},
];

export function SelectModel() {
	const [value, setValue] = useState(models[0].value);

	useEffect(() => {
		(async () => {
			try {
				const model = await cacheGet("model");

				if (models.some((m) => m.value === model)) {
					setValue(model);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, []);

	const handleSetValue = (value: string) => {
		void cacheSet("model", value);
		setValue(value);
	};

	return (
		<Select value={value} onValueChange={handleSetValue}>
			<SelectTrigger className="w-[300px]">
				<SelectValue placeholder="Select a model" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectLabel>Models</SelectLabel>
					{models.map((model) => (
						<SelectItem value={model.value} key={model.value}>{model.label}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
