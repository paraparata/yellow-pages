/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation AddContactWithPhones(\n    $first_name: String!\n    $last_name: String!\n    $phones: [phone_insert_input!]!\n  ) {\n    insert_contact(\n      objects: {\n        first_name: $first_name\n        last_name: $last_name\n        phones: { data: $phones }\n      }\n    ) {\n      returning {\n        first_name\n        last_name\n        id\n        phones {\n          number\n        }\n      }\n    }\n  }\n": types.AddContactWithPhonesDocument,
    "\n  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {\n    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {\n      returning {\n        contact {\n          id\n          last_name\n          first_name\n          phones {\n            number\n          }\n        }\n      }\n    }\n  }\n": types.AddNumberToContactDocument,
    "\n  mutation EditContactById($id: Int!, $_set: contact_set_input) {\n    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n": types.EditContactByIdDocument,
    "\n  mutation EditPhoneNumber(\n    $pk_columns: phone_pk_columns_input!\n    $new_phone_number: String!\n  ) {\n    update_phone_by_pk(\n      pk_columns: $pk_columns\n      _set: { number: $new_phone_number }\n    ) {\n      contact {\n        id\n        last_name\n        first_name\n        created_at\n        phones {\n          number\n        }\n      }\n    }\n  }\n": types.EditPhoneNumberDocument,
    "\n  mutation DeleteContactPhone($id: Int!) {\n    delete_contact_by_pk(id: $id) {\n      first_name\n      last_name\n      id\n    }\n  }\n": types.DeleteContactPhoneDocument,
    "\n  mutation DeletePhoneFromContact($contact_id: Int!, $number: String!) {\n    delete_phone_by_pk(contact_id: $contact_id, number: $number) {\n      contact_id\n      contact {\n        first_name\n        last_name\n      }\n    }\n  }\n": types.DeletePhoneFromContactDocument,
    "\n  query GetContactList(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      created_at\n      first_name\n      id\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n": types.GetContactListDocument,
    "\n  query GetContactListCount(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact_aggregate(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n": types.GetContactListCountDocument,
    "\n  query GetContactDetail($id: Int!) {\n    contact_by_pk(id: $id) {\n      last_name\n      id\n      first_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n": types.GetContactDetailDocument,
    "\n  query GetPhoneList(\n    $where: phone_bool_exp\n    $distinct_on: [phone_select_column!]\n    $limit: Int = 10\n    $offset: Int = 0\n    $order_by: [phone_order_by!]\n  ) {\n    phone(\n      where: $where\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n    ) {\n      contact {\n        last_name\n        first_name\n        id\n      }\n      number\n    }\n  }\n": types.GetPhoneListDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddContactWithPhones(\n    $first_name: String!\n    $last_name: String!\n    $phones: [phone_insert_input!]!\n  ) {\n    insert_contact(\n      objects: {\n        first_name: $first_name\n        last_name: $last_name\n        phones: { data: $phones }\n      }\n    ) {\n      returning {\n        first_name\n        last_name\n        id\n        phones {\n          number\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddContactWithPhones(\n    $first_name: String!\n    $last_name: String!\n    $phones: [phone_insert_input!]!\n  ) {\n    insert_contact(\n      objects: {\n        first_name: $first_name\n        last_name: $last_name\n        phones: { data: $phones }\n      }\n    ) {\n      returning {\n        first_name\n        last_name\n        id\n        phones {\n          number\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {\n    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {\n      returning {\n        contact {\n          id\n          last_name\n          first_name\n          phones {\n            number\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation AddNumberToContact($contact_id: Int!, $phone_number: String!) {\n    insert_phone(objects: { contact_id: $contact_id, number: $phone_number }) {\n      returning {\n        contact {\n          id\n          last_name\n          first_name\n          phones {\n            number\n          }\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditContactById($id: Int!, $_set: contact_set_input) {\n    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EditContactById($id: Int!, $_set: contact_set_input) {\n    update_contact_by_pk(pk_columns: { id: $id }, _set: $_set) {\n      id\n      first_name\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation EditPhoneNumber(\n    $pk_columns: phone_pk_columns_input!\n    $new_phone_number: String!\n  ) {\n    update_phone_by_pk(\n      pk_columns: $pk_columns\n      _set: { number: $new_phone_number }\n    ) {\n      contact {\n        id\n        last_name\n        first_name\n        created_at\n        phones {\n          number\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation EditPhoneNumber(\n    $pk_columns: phone_pk_columns_input!\n    $new_phone_number: String!\n  ) {\n    update_phone_by_pk(\n      pk_columns: $pk_columns\n      _set: { number: $new_phone_number }\n    ) {\n      contact {\n        id\n        last_name\n        first_name\n        created_at\n        phones {\n          number\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteContactPhone($id: Int!) {\n    delete_contact_by_pk(id: $id) {\n      first_name\n      last_name\n      id\n    }\n  }\n"): (typeof documents)["\n  mutation DeleteContactPhone($id: Int!) {\n    delete_contact_by_pk(id: $id) {\n      first_name\n      last_name\n      id\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeletePhoneFromContact($contact_id: Int!, $number: String!) {\n    delete_phone_by_pk(contact_id: $contact_id, number: $number) {\n      contact_id\n      contact {\n        first_name\n        last_name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation DeletePhoneFromContact($contact_id: Int!, $number: String!) {\n    delete_phone_by_pk(contact_id: $contact_id, number: $number) {\n      contact_id\n      contact {\n        first_name\n        last_name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetContactList(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      created_at\n      first_name\n      id\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContactList(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      created_at\n      first_name\n      id\n      last_name\n      phones {\n        number\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetContactListCount(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact_aggregate(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContactListCount(\n    $distinct_on: [contact_select_column!]\n    $limit: Int\n    $offset: Int\n    $order_by: [contact_order_by!]\n    $where: contact_bool_exp\n  ) {\n    contact_aggregate(\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n      where: $where\n    ) {\n      aggregate {\n        count\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetContactDetail($id: Int!) {\n    contact_by_pk(id: $id) {\n      last_name\n      id\n      first_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetContactDetail($id: Int!) {\n    contact_by_pk(id: $id) {\n      last_name\n      id\n      first_name\n      created_at\n      phones {\n        number\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetPhoneList(\n    $where: phone_bool_exp\n    $distinct_on: [phone_select_column!]\n    $limit: Int = 10\n    $offset: Int = 0\n    $order_by: [phone_order_by!]\n  ) {\n    phone(\n      where: $where\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n    ) {\n      contact {\n        last_name\n        first_name\n        id\n      }\n      number\n    }\n  }\n"): (typeof documents)["\n  query GetPhoneList(\n    $where: phone_bool_exp\n    $distinct_on: [phone_select_column!]\n    $limit: Int = 10\n    $offset: Int = 0\n    $order_by: [phone_order_by!]\n  ) {\n    phone(\n      where: $where\n      distinct_on: $distinct_on\n      limit: $limit\n      offset: $offset\n      order_by: $order_by\n    ) {\n      contact {\n        last_name\n        first_name\n        id\n      }\n      number\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;