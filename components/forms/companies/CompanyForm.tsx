"use client";
import {
	Company,
	getCompanyById,
	getCompanyRegions,
	getCompanyTaxStatus,
	getCompanyTypes,
	updateCompany,
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
import { useQueries, useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { companySchema } from "./formSchema";

export default function CompanyForm({ companyId }: { companyId: number }) {
	const [isFormDirty, setisFormDirty] = useState(false);
	const [state, formAction] = useFormState(
		updateCompany.bind(null, companyId),
		{
			message: "",
			fields: {},
		},
	);

	const { data: company, isLoading } = useQuery({
		queryFn: async () => await getCompanyById(companyId),
		queryKey: ["companyById", companyId],
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

	const form = useForm<z.output<typeof companySchema>>({
		resolver: zodResolver(companySchema),
		values: {
			companyId: company?.companyId ?? "",
			companyName: company?.companyName ?? "",
			companyTypeId: company?.companyTypeId ?? 1,
			address: company?.address ?? "",
			city: company?.city ?? "",
			regionId: company?.regionId ?? 1,
			postalCode: company?.postalCode ?? "",
			businessPhone: company?.businessPhone ?? "",
			taxStatusId: company?.taxStatusId ?? 1,
			website: company?.website ?? "",
			notes: company?.notes ?? "",
		} as Company,
	});

	useEffect(() => {
		form.reset();
	}, [form.reset]);

	useEffect(() => {
		setisFormDirty(form.formState.isDirty);
		console.log("updated", isFormDirty, form.formState.isDirty);
	}, [form.formState.isDirty, isFormDirty]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (!isLoading && company === undefined) {
		return redirect("/companies");
	}

	return (
		<section>
			<Form {...form}>
				<form action={formAction} className="flex flex-col space-y-3">
					<div className="flex flex-row items-center justify-center space-x-4">
						<span className="w-full">Company Id: {company?.companyId}</span>
						<FormField
							control={form.control}
							name="companyTypeId"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Type</FormLabel>
									<Select
										name="companyTypeId"
										onValueChange={field.onChange}
										defaultValue={company?.companyTypeId.toString()}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Select company type" />
											</SelectTrigger>
										</FormControl>
										<SelectContent align="end">
											{!!companyTypes &&
												companyTypes.data?.map((companyType, i) => (
													<SelectItem
														key={companyType.companyTypeId}
														value={companyType.companyTypeId.toString()}
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
					<div>
						<FormField
							control={form.control}
							name={"companyName"}
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Company name</FormLabel>
									<FormControl>
										<Input placeholder="Company name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Address</FormLabel>
									<FormControl>
										<Input placeholder="Address" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							name={"address"}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>City</FormLabel>
									<FormControl>
										<Input placeholder="City" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							name={"city"}
						/>
					</div>
					<div className="flex flex-row items-center justify-center space-x-4">
						<FormField
							control={form.control}
							name="regionId"
							render={({ field }) => (
								<FormItem className="w-full">
									<FormLabel>Region</FormLabel>
									<Select
										name="regionId"
										onValueChange={field.onChange}
										defaultValue={company?.regionId.toString()}
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
														value={region.regionId.toString()}
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
					<div>
						<FormField
							control={form.control}
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Phone</FormLabel>
									<FormControl>
										<Input placeholder="Phone" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							name={"businessPhone"}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="taxStatusId"
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Tax status</FormLabel>
									<Select
										name="taxStatusId"
										onValueChange={field.onChange}
										defaultValue={company?.taxStatusId.toString()}
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
														value={status.taxStatusId.toString()}
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
					</div>
					<div>
						<FormField
							control={form.control}
							render={({ field }) => (
								<FormItem className="">
									<FormLabel>Website</FormLabel>
									<FormControl>
										<Input placeholder="Website" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
							name={"website"}
						/>
					</div>
					<div>
						<FormField
							control={form.control}
							name="notes"
							render={({ field }) => (
								<FormItem className="">
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
					</div>
					{state?.message !== "" && (
						<div>
							<div className="text-red-400">{state?.message}</div>
						</div>
					)}
					<div className="flex flex-row space-x-4">
						<Button
							type="reset"
							variant={"secondary"}
							className="w-full"
							disabled={!isFormDirty}
						>
							Reset
						</Button>
						<Button
							type="submit"
							variant={"default"}
							className="w-full"
							disabled={!isFormDirty}
						>
							Save
						</Button>
					</div>
				</form>
			</Form>
		</section>
	);
}
