/**
 * Test file with intentional violations of all 17 coding rules
 * Used to verify code-rv-app rule detection
 */

// =============================================================================
// T002: Interface names should start with 'I'
// =============================================================================
interface UserService { // ❌ Should be IUserService
  findUser(id: number): User;
}

interface TodoRepository { // ❌ Should be ITodoRepository
  findAll(): Todo[];
}

// =============================================================================
// T019: No empty interfaces
// =============================================================================
interface EmptyConfig {} // ❌ Empty interface

interface EmptyOptions { // ❌ Empty interface
}

// =============================================================================
// T004: Interfaces should have public members only
// =============================================================================
interface IDataService {
  getData(): string;
  _internalMethod(): void; // ❌ Underscore prefix suggests private
  _cache: Map<string, any>; // ❌ Underscore prefix suggests private
}

// =============================================================================
// T003: @ts-ignore must have a reason
// =============================================================================
// @ts-ignore
const badIgnore = "no reason provided"; // ❌ No reason

// @ts-ignore - This is a valid reason for ignoring type error
const goodIgnore = "has reason";

// @ts-expect-error
const badExpectError = 123; // ❌ No reason

// =============================================================================
// T025/T026: Limit nested generics/unions
// =============================================================================
type DeeplyNestedType = Map<string, Map<number, Map<boolean, Set<Array<string>>>>>; // ❌ Too deep

type NestedUnion = (string | number) | (boolean | (null | undefined)); // ❌ Nested union

// =============================================================================
// C006: Function names must follow verb-noun pattern
// =============================================================================
function userData(id: number) { // ❌ Should be getUserData
  return { id };
}

function items(): string[] { // ❌ Should be getItems or fetchItems
  return [];
}

const processManager = () => { // ❌ Should be createProcessManager
  return {};
};

// =============================================================================
// C010: Block nesting ≤ 3 levels
// =============================================================================
function deeplyNestedFunction(data: any) {
  if (data) { // Level 1
    for (const item of data) { // Level 2
      if (item.active) { // Level 3
        try { // Level 4 ❌ Too deep
          if (item.value > 0) { // Level 5 ❌ Way too deep
            console.log("Too nested!");
          }
        } catch (e) {}
      }
    }
  }
}

// =============================================================================
// C014: Use Dependency Injection instead of direct instantiation
// =============================================================================
class UserRepository {
  getData() { return []; }
}

class BadService {
  private repo = new UserRepository(); // ❌ Direct instantiation
  
  doSomething() {
    const helper = new UserRepository(); // ❌ Direct instantiation
    return helper.getData();
  }
}

// =============================================================================
// C017/T007: Constructor logic and no functions in constructor
// =============================================================================
class BadConstructor {
  constructor(
    private service: UserService,
    private config: any,
  ) {
    // ❌ Complex logic in constructor
    if (config.debug) {
      console.log("Debug mode enabled");
    }
    
    // ❌ Async operation in constructor
    this.loadData().then(data => {
      console.log("Data loaded");
    });
    
    // ❌ Function declaration in constructor
    function helperFn() {
      return "bad";
    }
    
    const anotherHelper = async () => { // ❌ Arrow function in constructor
      return "also bad";
    };
    
    // Many statements
    this.setup();
    this.init();
    this.configure();
    this.validate();
    this.prepare();
    this.finalize();
  }
  
  private async loadData() { return {}; }
  private setup() {}
  private init() {}
  private configure() {}
  private validate() {}
  private prepare() {}
  private finalize() {}
}

// =============================================================================
// C018: Specific error messages (min 10 chars)
// =============================================================================
function throwShortError() {
  throw new Error("fail"); // ❌ Too short (4 chars)
}

function throwGenericError() {
  throw new Error("error"); // ❌ Generic message
}

function throwEmptyError() {
  throw new Error(); // ❌ No message at all
}

// =============================================================================
// C029: Catch blocks must log or rethrow
// =============================================================================
async function silentCatch() {
  try {
    await fetch("/api");
  } catch (error) {
    // ❌ Silent catch - no logging, no rethrow
    const x = 1;
    const y = 2;
  }
}

// =============================================================================
// C030: Use custom error classes instead of generic Error
// =============================================================================
function useGenericError() {
  throw new Error("This should use custom error class"); // ❌ Generic Error
}

// Correct way:
class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

// =============================================================================
// C035: No empty catch blocks
// =============================================================================
function emptyCatchBlock() {
  try {
    JSON.parse("invalid");
  } catch (e) {
    // ❌ Empty catch block
  }
}

// =============================================================================
// C041: Configuration via ConfigService
// =============================================================================
const API_URL = "http://localhost:3000/api"; // ❌ Hardcoded URL
const DB_PASSWORD = "password: secret123"; // ❌ Hardcoded password
const DB_CONNECTION = "mongodb://localhost:27017/db"; // ❌ Hardcoded connection

class HardcodedConfig {
  private apiKey = "api_key: sk-secret-key-12345"; // ❌ Hardcoded API key
  private redisUrl = "redis_url: redis://localhost:6379"; // ❌ Hardcoded Redis
  private port = 3000; // ❌ Hardcoded port (4+ digits trigger)
}

// =============================================================================
// C042: Boolean variables should have is/has/can prefix
// =============================================================================
const active: boolean = true; // ❌ Should be isActive
const visible = false; // ❌ Should be isVisible
let enabled: boolean = true; // ❌ Should be isEnabled
const completed: boolean = false; // ❌ Should be isCompleted
const loading = true; // ❌ Should be isLoading

// Correct examples:
const isReady: boolean = true;
const hasPermission = true;
const canEdit: boolean = false;

// =============================================================================
// C043: Using Logger, not console (already tested in main app)
// =============================================================================
function logExample() {
  console.log("Debug message"); // ❌ Should use Logger
  console.debug("More debug"); // ❌ Should use Logger
  console.info("Info message"); // ❌ Should use Logger
}

// =============================================================================
// C048: No var, only const/let
// =============================================================================
var oldStyle = "bad"; // ❌ Use const or let
var counter = 0; // ❌ Use let
var items = []; // ❌ Use const

// Correct:
const goodConst = "good";
let goodLet = 0;

// =============================================================================
// Types for the examples
// =============================================================================
interface User {
  id: number;
  name: string;
}

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

export {
  userData,
  items,
  BadService,
  BadConstructor,
  throwShortError,
  throwGenericError,
  silentCatch,
  emptyCatchBlock,
  logExample,
};
