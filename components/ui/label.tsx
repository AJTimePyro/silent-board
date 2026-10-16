"use client";

import { cn } from "cn";
import type * as React from "react";

type LabelProps = Omit<React.ComponentProps<"label">, "htmlFor"> & {
	htmlFor: string;
};

function Label({ className, ...props }: LabelProps) {
	return (
		// biome-ignore lint/a11y/noLabelWithoutControl: Reusable shadcn label associates with its control through htmlFor.
		<label
			data-slot="label"
			className={cn(
				"flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
				className,
			)}
			{...props}
		/>
	);
}

export { Label };
