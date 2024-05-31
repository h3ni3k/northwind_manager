"use client";
import {
	addCompany,
	getCompanyRegions,
	getCompanyTaxStatus,
	getCompanyTypes,
} from "@/actions/companies.actions";
import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueries } from "@tanstack/react-query";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { newCompanySchema } from "./formSchema";

export default function NewCompanyForm() {
	const [state, formAction] = useFormState(addCompany, {
		message: "",
		fields: {},
	});

	const [companyTypes, regions, taxStatus] = useQueries({
		queries: [
			{
				queryKey: ["companyTypes"],
				queryFn: async () => await getCompanyTypes(),
			},
			{
				queryKey: ["companyRegions"],
				queryFn: async () => await getCompanyRegions(),
			},
			{
				queryKey: ["companyTaxStatus"],
				queryFn: async () => await getCompanyTaxStatus(),
			},
		],
	});

	const form = useForm<z.output<typeof newCompanySchema>>({
		resolver: zodResolver(newCompanySchema),
		defaultValues: {
			...(state?.fields ?? {}),
		},
	});

	return (
		<Form {...form}>
			<form action={formAction} className="grid grid-cols-8 gap-y-2">
				<div className="col-span-6 flex flex-row items-center justify-center space-x-2">
					<div className="w-full">Company Id: XXX</div>
					<FormField
						control={form.control}
						name="companyTypeId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Type</FormLabel>
								<Select
									name="companyTypeId"
									onValueChange={field.onChange}
									defaultValue={field.value?.toString()}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select company type" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{!!companyTypes &&
											companyTypes.data?.map((companyType, i) => (
												<SelectItem
													key={companyType.companyTypeId}
													value={`${companyType.companyTypeId}`}
												>
													{companyType.companyType}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>
				<FormField
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Company name</FormLabel>
							<FormControl>
								<Input placeholder="Company name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name={"companyName"}
				/>
				<FormField
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Address</FormLabel>
							<FormControl>
								<Input placeholder="Address" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name={"address"}
				/>
				<FormField
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>City</FormLabel>
							<FormControl>
								<Input placeholder="City" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name={"city"}
				/>
				<div className="col-span-6 flex flex-row space-x-2">
					<FormField
						control={form.control}
						name="regionId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Region</FormLabel>
								<Select
									name="regionId"
									onValueChange={field.onChange}
									defaultValue={field.value?.toString()}
								>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Select region" />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{!!regions &&
											regions.data?.map((region, i) => (
												<SelectItem
													key={region.regionId}
													value={`${region.regionId}`}
												>
													{region.regionAbbrev} - {region.regionName}
												</SelectItem>
											))}
									</SelectContent>
								</Select>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						render={({ field }) => (
							<FormItem className="w-full">
								<FormLabel>Postal code</FormLabel>
								<FormControl>
									<Input placeholder="Postal code" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
						name={"postalCode"}
					/>
				</div>

				<FormField
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Phone</FormLabel>
							<FormControl>
								<Input placeholder="Phone" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name={"businessPhone"}
				/>
				<FormField
					control={form.control}
					name="taxStatusId"
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Tax status</FormLabel>
							<Select
								name="taxStatusId"
								onValueChange={field.onChange}
								defaultValue={field.value?.toString()}
							>
								<FormControl>
									<SelectTrigger>
										<SelectValue placeholder="Select tax status" />
									</SelectTrigger>
								</FormControl>
								<SelectContent>
									{!!taxStatus &&
										taxStatus.data?.map((status) => (
											<SelectItem
												key={status.taxStatusId}
												value={`${status.taxStatusId}`}
											>
												{status.taxStatus}
											</SelectItem>
										))}
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Website</FormLabel>
							<FormControl>
								<Input placeholder="Website" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
					name={"website"}
				/>
				<FormField
					control={form.control}
					name="notes"
					render={({ field }) => (
						<FormItem className="col-span-6">
							<FormLabel>Notes</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Tell us a little bit about yourself"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				{state?.message !== "" && (
					<div>
						<div className="text-red-400">{state.message}</div>
					</div>
				)}
				<div className="col-span-6 flex flex-row space-x-2 mt-4">
					<Button type="reset" variant={"secondary"} className="w-full">
						Cancel
					</Button>
					<Button type="submit" variant={"default"} className="w-full">
						Submit
					</Button>
				</div>
			</form>
		</Form>
	);
}
