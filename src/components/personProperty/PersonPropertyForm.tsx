/*
 * For copyright and license terms, see COPYRIGHT.md (top level of repository)
 * Repository: https://github.com/georga-app/georga-client-react
 */
import { useState, useEffect } from "react";
import { useQuery } from '@apollo/client';

import Button from "@mui/material/Button";
import Form from "@/components/shared/Form";

import { Input } from "@/components/shared/FormFields";

import {
  PersonPropertyType,
  GeorgaPersonPropertyGroupSelectionTypeChoices,
  GeorgaPersonPropertyGroupNecessityChoices,
} from '@/types/__generated__/graphql';
import { onlyType } from "@/types/Util";

function PersonPropertyForm({
  groupId,
  personProperty,
  onApply = (role) => undefined,
  onSuccess = () => undefined,
}: {
  groupId: string,
  personProperty?: PersonPropertyType,
  onApply?: (role: PersonPropertyType) => void,
  onSuccess?: () => void,
}) {
  // mode
  const create = !(personProperty);
  const edit = (personProperty);

  // fields
  const [name, setName] = useState("");

  // presets
  useEffect(() => {
    if (personProperty) {
      setName(personProperty.name || "");
    }
  }, [personProperty]);

  // return
  return (
    <Form handleSubmit={() => {}} error={undefined}>

      <Input
        id="name"
        value={name}
        setValue={setName}
        label="Name"
        required
      />

      <Button
        fullWidth
        variant="contained"
        color="secondary"
        sx={{ marginTop: 1 }}
        onClick={() => {
          if (edit) {
            const newPersonProperty = {
              ...personProperty,
              name: name,
            }
            onApply(newPersonProperty);
          }
          if (create) {
            const newPersonProperty = {
              id: "CREATE!" + Math.random().toString(36).substring(2,7),
              name: name,
            }
            onApply(newPersonProperty as PersonPropertyType);
          }
          onSuccess()
        }}
      >
        {"Apply"}
      </Button>
    </Form>
  );
}

export default PersonPropertyForm;
