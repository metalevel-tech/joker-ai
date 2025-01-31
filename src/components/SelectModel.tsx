"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/cn-utils";
import { cacheGet, cacheSet } from "@/server/cache/kv";

const models = [
	{
		value: "@cf/meta/llama-3-8b-instruct",
		label: "llama-3-8b-instruct",
	},
	{
		value: "@cf/meta/llama-3.1-8b-instruct",
		label: "llama-3.1-8b-instruct",
	},
	{
		value: "@cf/meta/llama-3.2-3b-instruct",
		label: "llama-3.2-3b-instruct",
	},
	{
		value: "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
		label: "llama-3.3-70b-instruct-fp8-fast",
	},
	{
		value: "@cf/mistral/mistral-7b-instruct-v0.1",
		label: "mistral-7b-instruct-v0.1",
	},
	{
		value: "@cf/deepseek-ai/deepseek-r1-distill-qwen-32b",
		label: "deepseek-r1-distill-qwen-32b",
	},
];

export function SelectModel() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState(models[0].value);

	React.useEffect(() => {
		(async () => {
			try {
				const model = await cacheGet("model");

				setValue(model);
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
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					role="combobox"
					aria-expanded={open}
					className="w-[260px] justify-between"
				>
					{value
						? models.find((model) => model.value === value)?.label
						: "Select model..."}
					<ChevronsUpDown className="opacity-50" />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="w-[260px] p-0">
				<Command>
					<CommandInput placeholder="Search model..." />
					<CommandList>
						<CommandEmpty>No model found.</CommandEmpty>
						<CommandGroup>
							{models.map((model) => (
								<CommandItem
									key={model.value}
									value={model.value}
									onSelect={(currentValue) => {
										handleSetValue(currentValue === value ? "" : currentValue);
										setOpen(false);
									}}
								>
									{model.label}
									<Check
										className={cn(
											"ml-auto",
											value === model.value ? "opacity-100" : "opacity-0"
										)}
									/>
								</CommandItem>
							))}
						</CommandGroup>
					</CommandList>
				</Command>
			</PopoverContent>
		</Popover>
	);
}
