/**
 * Information about player's Patreon status.
 */
type APIPlayerPatreon =
  | _APIPlayerPatreonPrivate
  | _APIPlayerPatreonNonPatron
  | _APIPlayerPatreonIsPatron;
export default APIPlayerPatreon;

/**
 * Base interface containing property type annotations and documentation.
 */
interface _APIPlayerPatreonBase {
  /**
   * If the user has donated or is currently donating via Patreon.
   */
  isPatron: boolean | null;

  /**
   * If the user has an active Patreon subscription.
   */
  active: boolean | null;

  /**
   * Hex code for subscribed tier.
   */
  color: string | null;

  /**
   * The tier ID of current pledge.
   */
  tierId: number | null;

  /**
   * Current pledge in cents.
   */
  currentPledge: number | null;

  /**
   * Lifetime pledge in cents.
   */
  lifetimePledge: number | null;

  /**
   * Next pledge in cents.
   */
  nextPledge: number | null;

  /**
   * If user has their Patreon information hidden.
   */
  hidden: boolean | null;
}

/**
 * `patreon` field when the user has their Patreon information hidden
 */
interface _APIPlayerPatreonPrivate extends _APIPlayerPatreonBase {
  isPatron: false | null;
  active: null;
  color: null;
  tierId: null;
  currentPledge: null;
  lifetimePledge: null;
  nextPledge: null;
  hidden: true;
}

/**
 * Base interface for public Patreon information
 */
interface _APIPartialPlayerPatreonPublicBase {
  lifetimePledge: number | null;
  hidden: false | null;
}

/**
 * Properties specific to the `patreon` field when the user is an inactive patron
 */
interface _APIPartialPlayerPatreonPublicInactive
  extends _APIPartialPlayerPatreonPublicBase {
  active: false;
  color: null;
  tierId: null;
  currentPledge: null;
  nextPledge: null;
}

/**
 * Properties specific to the `patreon` field when the user is an active patron
 */
interface _APIPartialPlayerPatreonPublicActive
  extends _APIPartialPlayerPatreonPublicBase {
  active: true;
  color: string;
  tierId: number;
  currentPledge: number;
  nextPledge: number | null;
}

/**
 * `patreon` field when the user is not a patron (ie. has never donated)
 */
interface _APIPlayerPatreonNonPatron
  extends _APIPartialPlayerPatreonPublicInactive {
  isPatron: false;
}

/**
 * `patreon` field when the user is a current or former patron
 */
type _APIPlayerPatreonIsPatron = _APIPlayerPatreonBase & { isPatron: true } & (
    | _APIPartialPlayerPatreonPublicInactive
    | _APIPartialPlayerPatreonPublicActive
  );
