"use client";

import { modelList } from "@/data/models";
import { cacheGet, cacheSet } from "@/server/cache/kv";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";


export function SelectModel() {
	const [value, setValue] = useState(modelList[0].value);
	const { user } = useUser();
	const cacheKey = `model_${user?.id}`;

	useEffect(() => {
		(async () => {
			try {
				const model = await cacheGet(cacheKey);

				if (modelList.some((m) => m.value === model)) {
					setValue(model);
				}
			} catch (error) {
				console.error(error);
			}
		})();
	}, [cacheKey]);

	const handleSetValue = (value: string) => {
		cacheSet(cacheKey, value);
		setValue(value);
	};

	return (
		<Select value={value} onValueChange={handleSetValue}>
			<SelectTrigger className="border-none bg-transparent w-full">
				<SelectValue placeholder="Select a model" />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					{modelList.map((model) => (
						<SelectItem value={model.value} key={model.value}>{model.label}</SelectItem>
					))}
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
