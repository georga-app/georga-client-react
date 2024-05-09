/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState } from "react";

import Button from "@mui/material/Button";

import Form from "@/components/shared/Form";
import { Input, EnumSelect, ObjectAutocomplete } from "@/components/shared/FormFields";

import {
  AceType,
  GeorgaAcePermissionChoices,
} from '@/types/__generated__/graphql';

function AceForm({
  personId,
  organizationId,
  ace,
  onApply = (role) => undefined,
  onSuccess = () => undefined,
}: {
  personId: string,
  organizationId: string,
  ace: AceType,
  onApply?: (role: AceType) => void,
  onSuccess?: () => void,
}) {
  // fields
  const [permission, setPermission] = useState<AceType['permission'] | "">("");
  const [instance, setInstance] = useState<AceType['instance'] | "">("");

  // return
  return (
    <Form handleSubmit={() => {}} error={undefined}>

      <ObjectAutocomplete<AceType['instance']>
        id="instance"
        value={instance}
        setValue={setInstance}
        errors={[]}
        label="Object"
        required
        organizations
        projects
        operations
      />

      <EnumSelect
        id="permission"
        options={GeorgaAcePermissionChoices}
        getOptionLabel={option => option.toLowerCase()}
        value={permission}
        setValue={setPermission}
        label="Permission"
        required
      />

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        disabled={!instance || !permission}
        onClick={() => {
          const newAcl = {
            id: "CREATE!" + Math.random().toString(36).substring(2,7),
            person: { id: personId },
            instance: instance,
            permission: permission,
          }
          onApply(newAcl as AceType);
          onSuccess()
        }}
      >
        {"Apply"}
      </Button>
    </Form>
  );
}

export default AceForm;
