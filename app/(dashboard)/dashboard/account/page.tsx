import AccountForm from "@/components/dashboard/account/accountForm";

export default function AccountPage() {
    return (
        <div className="space-y-6">

            <div>

                <h1 className="text-3xl font-bold">
                    Account Settings
                </h1>

                <p className="text-muted-foreground">
                    Manage your profile and
                    business information.
                </p>

            </div>

            <AccountForm />

        </div>
    );
}