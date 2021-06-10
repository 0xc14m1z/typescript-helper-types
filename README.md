# typescript-helper-types

This repository contains some of the Typescript types I keep reusing in most of my projects, both professional and personal.

Some day I might think of gather all of them into a package but, in the mean time, if you find some of them useful, feel free to copy paste those into your codebase.

**Note on the notation**: in this repo I always used the extended version for generic type names. I'm not personally into `T`, `K` and such, I find this naming convention rather distant from the good coding practice of avoiding one-letter variables/things, but I guess that's on me 🤷‍♂️ .

---

#### `DeepPartial<Type>`

Constructs a type with all the properties of `Type` set to optional at all levels of depth. It acts as a recursive `Partial<Type>` basically.

```typescript
interface Person = {
  firstName: string,
  lastName: string,
  contacts: {
    primary: string,
    secondary: string
  }
}

DeepPartial<Person> === {
  firstName?: string,
  lastName?: string,
  contacts?: {
    primary?: string,
    secondary?: string
  }
}
```

#### `Either<OneType, OtherType>`

Constructs a type that strictly represents one or the other given types.

The symbol `|` when used among two types is "mentally read" as "or", but it
isn't. It's name is Union, because it unites together the types that surround
it.

```typescript
type Person = { firstName: string; lastName: string };
type Company = { legalEntityName: string };

type LoosePersonOrCompany = Person | Company;
```

In this example `LoosePersonOrCompany` is accepting as a valid value the sum
(hence, the union) of the `Person` and the `Company` types, not only one of them.
The following is perfectly valid assignment:

```typescript
const O1: LoosePersonOrCompany = {
  firstName: "James",
  lastName: "Bond",
  legalEntityName: "Queen",
};
```

With `Either<Person, Company>`, instead, Typescript complains as it should.

```typescript
type StrictPersonOrCompany = Either<Person, Company>;

const O2: StrictPersonOrCompany = {
  firstName: "James",
  lastName: "Bond",
  legalEntityName: "Queen",
};
// 😠  Type '{ firstName: string; lastName: string; legalEntityName: string; }' is not assignable to type 'StrictPersonOrCompany'.

const O3: StrictPersonOrCompany = {
  firstName: "James",
  legalEntityName: "Queen",
};
// 😠  Type '{ firstName: string; legalEntityName: string; }' is not assignable to type 'StrictPersonOrCompany'.

const O4: StrictPersonOrCompany = {
  lastName: "Bond",
  legalEntityName: "Queen",
};
// 😠  Type '{ lastName: string; legalEntityName: string; }' is not assignable to type 'StrictPersonOrCompany'.

const O5: StrictPersonOrCompany = { firstName: "James", lastName: "Bond" };
// 😎  No problem!

const O6: StrictPersonOrCompany = { legalEntityName: "Queen" };
// 😎  No problem!
```

#### `FactoryOf<Type, WithArgs>`

Represents a value of type `Type` or a function that returns `Type` given arguments of type `WithArgs`.

```typescript
type RectangleArea = FactoryOf<number, [base: number, height: number]>;

const A1: RectangleArea = 123; // 😎  No problem!
const A2: RectangleArea = (base: number, height: number) => base * height; // 😎  No problem!

const A3: RectangleArea = (base: number, height: string) => base + height;
// 😠
// Type '(base: number, height: string) => number' is not assignable to type 'FactoryOf<number, [base: number, height: number]>'.
//   Type '(base: number, height: string) => number' is not assignable to type '(base: number, height: number) => number'.
//     Types of parameters 'height' and 'height' are incompatible.
//       Type 'number' is not assignable to type 'string'.(2322)
```

#### `Never<Type>`

Constructs a type with all the properties of `Type` set to `never`.

```typescript
type Person = { firstName: string, lastName: string }
Never<Person> === { firstName: never, lastName: never }
```

#### `Nullable<Type>`

Alias for `Type | null`.

#### `Optional<Type>`

Alias for `Type | null | undefined`.

#### `PlainObject`

Better `object` that solves property accessibility issues.

```typescript
const O1: object = { name: "Bond" };
O1.name = "James Bond"; // 😠  Property 'name' does not exist on type 'object'.(2339)

const O2: PlainObject = { name: "Bond" };
O2.name = "James Bond"; // 😎  No problem!
```
