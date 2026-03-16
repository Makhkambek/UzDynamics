export interface ProjectSpec {
  label: string;
  value: string;
  classified?: boolean;
}

export interface Project {
  id:          string;
  slug:        string;
  type:        string;
  name:        string;
  status:      "OPERATIONAL" | "TESTING" | "CLASSIFIED";
  category:    string;
  perm:        string;
  size:        string;
  description: string;
  longDescription: string;
  specs:       ProjectSpec[];
}

const projects: Project[] = [
  {
    id:       "UZD-001",
    slug:     "uzd-001",
    type:     "UAV",
    name:     "RECON_DRONE_X1",
    status:   "OPERATIONAL",
    category: "Drone",
    perm:     "-rwxr--r--",
    size:     "14.2 MB",
    description:
      "Long-range reconnaissance UAV with advanced imaging systems and autonomous navigation. Extended surveillance in contested environments.",
    longDescription:
      "RECON_DRONE_X1 is a long-endurance, fixed-wing reconnaissance platform designed for extended ISR (Intelligence, Surveillance, Reconnaissance) missions in contested airspace. Equipped with a multi-spectral imaging payload and a fully autonomous navigation stack, it operates beyond visual line of sight (BVLOS) with minimal operator input. The system features encrypted telemetry, automatic return-to-base, and a low acoustic signature optimised for covert operations.",
    specs: [
      { label: "WINGSPAN",       value: "2.4 m" },
      { label: "MAX_ALTITUDE",   value: "4 200 m" },
      { label: "ENDURANCE",      value: "6 h" },
      { label: "RANGE",          value: "120 km" },
      { label: "PAYLOAD",        value: "1.2 kg" },
      { label: "CAMERA",         value: "4K EO/IR dual-sensor" },
      { label: "NAVIGATION",     value: "GPS + INS + optical flow" },
      { label: "COMM_LINK",      value: "AES-256 encrypted, 900 MHz" },
      { label: "LAUNCH",         value: "Catapult / hand-launch" },
      { label: "PROPULSION",     value: "Brushless electric, pusher" },
    ],
  },
  {
    id:       "UZD-002",
    slug:     "uzd-002",
    type:     "UAV",
    name:     "COMBAT_DRONE_V2",
    status:   "CLASSIFIED",
    category: "Drone",
    perm:     "-rwx------",
    size:     "28.7 MB",
    description:
      "Next-generation strike UAV with AI-assisted target acquisition. High-speed, low-altitude tactical interdiction platform.",
    longDescription:
      "COMBAT_DRONE_V2 is a classified tactical strike platform developed under a government defense contract. Full mission profile and capability details are restricted to authorized personnel with appropriate clearance. General program objective: precision engagement capability at extended standoff range with minimal collateral signature.",
    specs: [
      { label: "WINGSPAN",       value: "CLASSIFIED", classified: true },
      { label: "MAX_ALTITUDE",   value: "CLASSIFIED", classified: true },
      { label: "ENDURANCE",      value: "CLASSIFIED", classified: true },
      { label: "RANGE",          value: "CLASSIFIED", classified: true },
      { label: "PAYLOAD",        value: "CLASSIFIED", classified: true },
      { label: "GUIDANCE",       value: "CLASSIFIED", classified: true },
      { label: "PROPULSION",     value: "CLASSIFIED", classified: true },
      { label: "PROGRAM_STATUS", value: "Active — Gov. contract" },
      { label: "CLEARANCE_REQ",  value: "SECRET" },
    ],
  },
  {
    id:       "UZD-003",
    slug:     "uzd-003",
    type:     "UGV",
    name:     "URBAN_ROVER",
    status:   "TESTING",
    category: "Autonomous Vehicle",
    perm:     "-rwxr-xr--",
    size:     "9.1 MB",
    description:
      "Compact autonomous ground vehicle for urban operations. Multi-sensor fusion with real-time obstacle detection and path planning.",
    longDescription:
      "URBAN_ROVER is a compact UGV (Unmanned Ground Vehicle) purpose-built for dense urban environments. It combines LiDAR, stereo vision, and ultrasonic sensors into a real-time obstacle avoidance and path planning stack built on ROS2. The platform supports modular payload bays — currently in field-testing with ISR and EOD (explosive ordnance disposal) configurations. Designed to operate in GPS-denied environments using SLAM-based localisation.",
    specs: [
      { label: "DIMENSIONS",     value: "0.6 × 0.4 × 0.3 m" },
      { label: "WEIGHT",         value: "18 kg" },
      { label: "MAX_SPEED",      value: "8 km/h" },
      { label: "ENDURANCE",      value: "4 h (Li-ion)" },
      { label: "SENSORS",        value: "LiDAR, stereo cam, ultrasonic" },
      { label: "NAVIGATION",     value: "ROS2 Nav2 + SLAM" },
      { label: "PAYLOAD_BAY",    value: "Modular, up to 5 kg" },
      { label: "COMMS",          value: "Wi-Fi 6 + LTE fallback" },
      { label: "STATUS",         value: "Field testing — phase 2" },
    ],
  },
  {
    id:       "UZD-004",
    slug:     "uzd-004",
    type:     "UGV",
    name:     "DESERT_CRAWLER",
    status:   "OPERATIONAL",
    category: "Autonomous Vehicle",
    perm:     "-rwxr--r--",
    size:     "17.6 MB",
    description:
      "Heavy-duty autonomous platform engineered for extreme desert terrain. Advanced thermal management and obstacle traversal.",
    longDescription:
      "DESERT_CRAWLER is a ruggedised heavy-duty UGV designed for extreme arid terrain — loose sand, rocky inclines, and high-temperature environments. Six-wheel drive with independent suspension allows traversal of obstacles up to 0.4 m. Onboard thermal management keeps electronics operational in ambient temperatures up to 55 °C. Supports long-range autonomous missions with satellite uplink fallback and a 72-hour operational endurance on a single fuel cell charge.",
    specs: [
      { label: "DIMENSIONS",     value: "1.4 × 0.9 × 0.7 m" },
      { label: "WEIGHT",         value: "120 kg" },
      { label: "MAX_SPEED",      value: "25 km/h" },
      { label: "ENDURANCE",      value: "72 h (fuel cell)" },
      { label: "DRIVE",          value: "6WD, independent suspension" },
      { label: "OBSTACLE",       value: "Up to 0.4 m clearance" },
      { label: "TEMP_RANGE",     value: "-10 °C to +55 °C" },
      { label: "PAYLOAD",        value: "Up to 80 kg" },
      { label: "COMMS",          value: "Satellite + encrypted RF" },
      { label: "NAVIGATION",     value: "GPS + INS + terrain mapping" },
    ],
  },
  {
    id:       "UZD-005",
    slug:     "uzd-005",
    type:     "DEF",
    name:     "SHIELD_SYSTEM",
    status:   "CLASSIFIED",
    category: "Military",
    perm:     "-rwx------",
    size:     "44.0 MB",
    description:
      "Integrated multi-layer defense shield. 360° detection and interception against aerial and ground-based threats.",
    longDescription:
      "SHIELD_SYSTEM is a classified integrated air and ground defense platform developed in cooperation with state defense agencies. It combines multi-spectral threat detection, automated threat classification, and a layered interception capability. Further details are restricted under national security protocols. Access requires TOP SECRET clearance and formal briefing request through official channels.",
    specs: [
      { label: "DETECTION_RANGE", value: "CLASSIFIED", classified: true },
      { label: "INTERCEPTION",    value: "CLASSIFIED", classified: true },
      { label: "THREAT_TYPES",    value: "CLASSIFIED", classified: true },
      { label: "REACTION_TIME",   value: "CLASSIFIED", classified: true },
      { label: "POWER_SOURCE",    value: "CLASSIFIED", classified: true },
      { label: "COVERAGE",        value: "360°" },
      { label: "PROGRAM_STATUS",  value: "Active — State contract" },
      { label: "CLEARANCE_REQ",   value: "TOP SECRET" },
    ],
  },
  {
    id:       "UZD-006",
    slug:     "uzd-006",
    type:     "TAC",
    name:     "TACTICAL_UNIT",
    status:   "CLASSIFIED",
    category: "Military",
    perm:     "-rwx------",
    size:     "31.3 MB",
    description:
      "Modular tactical robotic platform for high-risk deployments. Semi-autonomous with remote override capability.",
    longDescription:
      "TACTICAL_UNIT is a classified modular robotic system designed for high-risk force-projection and CBRN (chemical, biological, radiological, nuclear) reconnaissance roles. The platform's architecture supports rapid payload swaps between mission configurations. Semi-autonomous operation with encrypted remote override. Program details are restricted to personnel with active SECRET clearance and need-to-know authorisation.",
    specs: [
      { label: "CONFIGURATION",  value: "CLASSIFIED", classified: true },
      { label: "PAYLOAD_TYPES",  value: "CLASSIFIED", classified: true },
      { label: "MOBILITY",       value: "CLASSIFIED", classified: true },
      { label: "ENDURANCE",      value: "CLASSIFIED", classified: true },
      { label: "COMMS",          value: "CLASSIFIED", classified: true },
      { label: "AUTONOMY",       value: "Semi-autonomous + remote override" },
      { label: "PROGRAM_STATUS", value: "Active — State contract" },
      { label: "CLEARANCE_REQ",  value: "SECRET" },
    ],
  },
];

export default projects;
