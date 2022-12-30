import { Node, parse } from "node-html-parser"
import { stringToInt } from "./util"

export class HTMLParser {
    private getValueFromStat(statdiv: Node, index: number): string | number {
        return stringToInt(
            statdiv.childNodes[1].childNodes[1].childNodes[index]?.childNodes[3]
                ?.childNodes[0].rawText || "0"
        )
    }

    parsePlayerStats(data: string) {
        if (data.includes("This member is not sharing game stats"))
            return {
                error: true,
                message: "Private profile",
            }

        if (
            data
                .substr(
                    data.indexOf("<td>Time spent in GTA Online</td>") + 33,
                    250
                )
                .split("<td>")[1]
                .split("</td>")[0] == "0"
        )
            return {
                error: true,
                message: "Invalid Player",
            }

        const root = parse(data)
        const tablecontent =
            root.childNodes[3].childNodes[3].childNodes[3].childNodes[1]

        const careerStats = tablecontent.childNodes[1]
        const skillStats = tablecontent.childNodes[3]
        const generalStats = tablecontent.childNodes[5]
        const crimesStats = tablecontent.childNodes[7]
        const vehicleStats = tablecontent.childNodes[9]
        const cashStats = tablecontent.childNodes[11]
        const combatStats = tablecontent.childNodes[13]
        const weaponStats = tablecontent.childNodes[15]

        return {
            career: {
                overall_income: this.getValueFromStat(careerStats, 1),
                overall_expenses: this.getValueFromStat(careerStats, 3),
                total_players_killed: this.getValueFromStat(careerStats, 5),
                total_deaths_by_players: this.getValueFromStat(careerStats, 7),
                "competitive_player_kill-death_ratio": this.getValueFromStat(
                    careerStats,
                    9
                ),
                distance_traveled: this.getValueFromStat(careerStats, 11),
                favorite_radio_station: this.getValueFromStat(careerStats, 13),
                time_spent_in_gta_online: this.getValueFromStat(
                    careerStats,
                    15
                ),
                time_played_in_first_person: this.getValueFromStat(
                    careerStats,
                    17
                ),
                time_spent_in_deathmatches: this.getValueFromStat(
                    careerStats,
                    19
                ),
                time_spent_in_races: this.getValueFromStat(careerStats, 21),
                time_spent_in_the_creator: this.getValueFromStat(
                    careerStats,
                    23
                ),
                deathmatches_published: this.getValueFromStat(careerStats, 25),
                races_published: this.getValueFromStat(careerStats, 27),
                captures_published: this.getValueFromStat(careerStats, 29),
                last_team_standings_published: this.getValueFromStat(
                    careerStats,
                    31
                ),
            },
            general: {
                time_played_as_character: this.getValueFromStat(
                    generalStats,
                    1
                ),
                character_created: this.getValueFromStat(generalStats, 3),
                last_ranked_up: this.getValueFromStat(generalStats, 5),
                longest_single_game_session: this.getValueFromStat(
                    generalStats,
                    7
                ),
                average_time_per_session: this.getValueFromStat(
                    generalStats,
                    9
                ),
                total_deaths: this.getValueFromStat(generalStats, 11),
                deaths_by_explosion: this.getValueFromStat(generalStats, 13),
                deaths_by_falling: this.getValueFromStat(generalStats, 15),
                deaths_by_fire: this.getValueFromStat(generalStats, 17),
                deaths_by_traffic: this.getValueFromStat(generalStats, 19),
                deaths_by_drowning: this.getValueFromStat(generalStats, 21),
                time_swimming: this.getValueFromStat(generalStats, 23),
                distance_traveled_swimming: this.getValueFromStat(
                    generalStats,
                    25
                ),
                time_underwater: this.getValueFromStat(generalStats, 27),
                time_walking: this.getValueFromStat(generalStats, 29),
                distance_traveled_walking: this.getValueFromStat(
                    generalStats,
                    31
                ),
                distance_traveled_running: this.getValueFromStat(
                    generalStats,
                    33
                ),
                "farthest_free-fall_survived": this.getValueFromStat(
                    generalStats,
                    35
                ),
                time_in_cover: this.getValueFromStat(generalStats, 37),
                photos_taken: this.getValueFromStat(generalStats, 39),
                private_dances: this.getValueFromStat(generalStats, 41),
                sex_acts_purchased: this.getValueFromStat(generalStats, 43),
                highest_survival_wave_reached: this.getValueFromStat(
                    generalStats,
                    47
                ),
            },
            crime: {
                cops_killed: this.getValueFromStat(crimesStats, 1),
                noose_killed: this.getValueFromStat(crimesStats, 3),
                times_wanted: this.getValueFromStat(crimesStats, 5),
                wanted_stars_attained: this.getValueFromStat(crimesStats, 7),
                wanted_stars_evaded: this.getValueFromStat(crimesStats, 9),
                time_spent_with_a_wanted_level: this.getValueFromStat(
                    crimesStats,
                    11
                ),
                last_wanted_level_duration: this.getValueFromStat(
                    crimesStats,
                    13
                ),
                longest_wanted_level_duration: this.getValueFromStat(
                    crimesStats,
                    15
                ),
                time_spent_with_a_5_star_wanted_level: this.getValueFromStat(
                    crimesStats,
                    17
                ),

                "drive-by_kills_as_driver": this.getValueFromStat(
                    crimesStats,
                    19
                ),
                "drive-by_kills_as_passenger": this.getValueFromStat(
                    crimesStats,
                    21
                ),
                tires_shot_out: this.getValueFromStat(crimesStats, 23),
                vehicular_kills: this.getValueFromStat(crimesStats, 25),
                cars_stolen: this.getValueFromStat(crimesStats, 27),
                motorcycles_stolen: this.getValueFromStat(crimesStats, 29),
                helicopters_stolen: this.getValueFromStat(crimesStats, 31),
                planes_stolen: this.getValueFromStat(crimesStats, 33),
                boats_stolen: this.getValueFromStat(crimesStats, 35),
                Atvs_stolen: this.getValueFromStat(crimesStats, 37),
                bicycles_stolen: this.getValueFromStat(crimesStats, 39),
                cop_vehicles_stolen: this.getValueFromStat(crimesStats, 41),
                store_hold_ups: this.getValueFromStat(crimesStats, 43),
            },
            vehicle: {
                time_driving_cars: this.getValueFromStat(vehicleStats, 1),
                distance_traveled_in_cars: this.getValueFromStat(
                    vehicleStats,
                    3
                ),
                time_riding_motorcycles: this.getValueFromStat(vehicleStats, 5),
                distance_traveled_on_motorcycles: this.getValueFromStat(
                    vehicleStats,
                    7
                ),
                time_flying_helicopters: this.getValueFromStat(vehicleStats, 9),
                distance_traveled_in_helicopters: this.getValueFromStat(
                    vehicleStats,
                    11
                ),
                time_flying_planes: this.getValueFromStat(vehicleStats, 13),
                distance_traveled_in_planes: this.getValueFromStat(
                    vehicleStats,
                    15
                ),
                time_sailing_boats: this.getValueFromStat(vehicleStats, 17),
                distance_traveled_in_boats: this.getValueFromStat(
                    vehicleStats,
                    19
                ),
                time_riding_Atvs: this.getValueFromStat(vehicleStats, 21),
                distance_traveled_on_Atvs: this.getValueFromStat(
                    vehicleStats,
                    23
                ),
                time_riding_bicycles: this.getValueFromStat(vehicleStats, 25),
                distance_traveled_on_bicycles: this.getValueFromStat(
                    vehicleStats,
                    27
                ),
                highest_speed_in_a_road_vehicle: this.getValueFromStat(
                    vehicleStats,
                    29
                ),
                road_vehicle_driven_fastest_shotaro: this.getValueFromStat(
                    vehicleStats,
                    31
                ),
                farthest_stoppie: this.getValueFromStat(vehicleStats, 33),
                farthest_wheelie: this.getValueFromStat(vehicleStats, 35),
                farthest_driven_without_crashing: this.getValueFromStat(
                    vehicleStats,
                    37
                ),
                car_crashes: this.getValueFromStat(vehicleStats, 39),
                motorcycle_crashes: this.getValueFromStat(vehicleStats, 41),
                Atv_crashes: this.getValueFromStat(vehicleStats, 43),
                bailed_from_a_moving_vehicle: this.getValueFromStat(
                    vehicleStats,
                    45
                ),
                farthest_vehicle_jump: this.getValueFromStat(vehicleStats, 47),
                highest_vehicle_jump: this.getValueFromStat(vehicleStats, 49),
                most_flips_in_one_vehicle_jump: this.getValueFromStat(
                    vehicleStats,
                    51
                ),
                most_spins_in_one_vehicle_jump: this.getValueFromStat(
                    vehicleStats,
                    53
                ),
                unique_stunt_jumps_found: this.getValueFromStat(
                    vehicleStats,
                    55
                ),
                unique_stunt_jumps_completed: this.getValueFromStat(
                    vehicleStats,
                    57
                ),
                near_misses: this.getValueFromStat(vehicleStats, 59),
                cop_cars_blown_up: this.getValueFromStat(vehicleStats, 61),
                cars_blown_up: this.getValueFromStat(vehicleStats, 63),
                motorcycles_blown_up: this.getValueFromStat(vehicleStats, 65),
                helicopters_blown_up: this.getValueFromStat(vehicleStats, 67),
                planes_blown_up: this.getValueFromStat(vehicleStats, 69),
                boats_blown_up: this.getValueFromStat(vehicleStats, 71),
                Atvs_blown_up: this.getValueFromStat(vehicleStats, 73),
                vehicles_repaired: this.getValueFromStat(vehicleStats, 75),
                vehicles_resprayed: this.getValueFromStat(vehicleStats, 77),
                cars_exported: this.getValueFromStat(vehicleStats, 79),
                highest_hydraulic_jump: this.getValueFromStat(vehicleStats, 81),
            },
            cash: {
                "spent_on_weapons&armor": this.getValueFromStat(cashStats, 1),
                "spent_on_vehicles&maintenance": this.getValueFromStat(
                    cashStats,
                    3
                ),
                "spent_on_style&entertainment": this.getValueFromStat(
                    cashStats,
                    5
                ),
                "spent_on_property&utilities": this.getValueFromStat(
                    cashStats,
                    7
                ),
                "spent_on_job&activity_entry_fees": this.getValueFromStat(
                    cashStats,
                    9
                ),
                spent_on_betting: this.getValueFromStat(cashStats, 11),
                spent_on_contact_services: this.getValueFromStat(cashStats, 13),
                spent_on_healthcare: this.getValueFromStat(cashStats, 15),
                dropped_or_stolen: this.getValueFromStat(cashStats, 17),
                given_to_others: this.getValueFromStat(cashStats, 19),
                earned_from_jobs: this.getValueFromStat(cashStats, 21),
                earned_from_selling_vehicles: this.getValueFromStat(
                    cashStats,
                    23
                ),
                earned_from_betting: this.getValueFromStat(cashStats, 25),
                earned_from_good_sport_reward: this.getValueFromStat(
                    cashStats,
                    27
                ),
                picked_up: this.getValueFromStat(cashStats, 29),
                received_from_others: this.getValueFromStat(cashStats, 31),
            },
            combat: {
                shots: this.getValueFromStat(combatStats, 1),
                hits: this.getValueFromStat(combatStats, 3),
                accuracy: this.getValueFromStat(combatStats, 5),
                kills: this.getValueFromStat(combatStats, 7),
                headshot_kills: this.getValueFromStat(combatStats, 9),
                armed_kills: this.getValueFromStat(combatStats, 11),
                free_aim_kills: this.getValueFromStat(combatStats, 13),
                stealth_kills: this.getValueFromStat(combatStats, 15),
                counter_attacks: this.getValueFromStat(combatStats, 17),
                player_kills: this.getValueFromStat(combatStats, 19),
                player_headshot_kills: this.getValueFromStat(combatStats, 21),
                survival_kills: this.getValueFromStat(combatStats, 23),
                gang_attack_kills: this.getValueFromStat(combatStats, 25),
                highest_killstreak_in_deathmatch: this.getValueFromStat(
                    combatStats,
                    27
                ),
                archenemy: this.getValueFromStat(combatStats, 29),
                times_killed_by_Archenemy: this.getValueFromStat(
                    combatStats,
                    31
                ),
                victim: this.getValueFromStat(combatStats, 33),
                victim_kills: this.getValueFromStat(combatStats, 35),
            },
            weapons: {
                pistol_kills: this.getValueFromStat(weaponStats, 1),
                combat_pistol_kills: this.getValueFromStat(weaponStats, 3),
                ap_istol_kills: this.getValueFromStat(weaponStats, 5),
                "Pistol_.50_kills": this.getValueFromStat(weaponStats, 7),
                heavy_pistol_kills: this.getValueFromStat(weaponStats, 9),
                vintage_pistol_kills: this.getValueFromStat(weaponStats, 11),
                heavy_revolver_kills: this.getValueFromStat(weaponStats, 13),
                pistol_mk_II_kills: this.getValueFromStat(weaponStats, 15),
                sns_pistol_mk_II_kills: this.getValueFromStat(weaponStats, 17),
                "double-action_revolver_kills": this.getValueFromStat(
                    weaponStats,
                    19
                ),
                flare_gun_kills: this.getValueFromStat(weaponStats, 21),
                navy_revolver_kills: this.getValueFromStat(weaponStats, 23),
                ceramic_pistol_kills: this.getValueFromStat(weaponStats, 25),
                perico_pistol_kills: this.getValueFromStat(weaponStats, 27),
                "sawed-off_shotgun_kills": this.getValueFromStat(
                    weaponStats,
                    29
                ),
                pump_shotgun_kills: this.getValueFromStat(weaponStats, 31),
                assault_shotgun_kills: this.getValueFromStat(weaponStats, 33),
                bullpup_shotgun_kills: this.getValueFromStat(weaponStats, 35),
                heavy_shotgun_kills: this.getValueFromStat(weaponStats, 37),
                double_barrel_shotgun_kills: this.getValueFromStat(
                    weaponStats,
                    39
                ),
                pump_shotgun_mk_II_kills: this.getValueFromStat(
                    weaponStats,
                    41
                ),
                micro_smg_kills: this.getValueFromStat(weaponStats, 43),
                smg_kills: this.getValueFromStat(weaponStats, 45),
                assault_smg_kills: this.getValueFromStat(weaponStats, 47),
                gusenberg_sweeper_kills: this.getValueFromStat(weaponStats, 49),
                machine_pistol_kills: this.getValueFromStat(weaponStats, 51),
                mini_smg_kills: this.getValueFromStat(weaponStats, 53),
                smg_mk_II_kills: this.getValueFromStat(weaponStats, 55),
                mg_kills: this.getValueFromStat(weaponStats, 57),
                combat_mgkills: this.getValueFromStat(weaponStats, 59),
                combat_mk_mk_II_kills: this.getValueFromStat(weaponStats, 61),
                assault_rifle_kills: this.getValueFromStat(weaponStats, 63),
                carbine_rifle_kills: this.getValueFromStat(weaponStats, 65),
                advanced_rifle_kills: this.getValueFromStat(weaponStats, 67),
                special_carbine_kills: this.getValueFromStat(weaponStats, 69),
                musket_kills: this.getValueFromStat(weaponStats, 71),
                compact_rifle_kills: this.getValueFromStat(weaponStats, 73),
                marksman_rifle_kills: this.getValueFromStat(weaponStats, 75),
                special_carbine_mk_II_kills: this.getValueFromStat(
                    weaponStats,
                    77
                ),
                assault_rifle_mkII_kills: this.getValueFromStat(
                    weaponStats,
                    79
                ),
                carbine_rifle_mk_II_kills: this.getValueFromStat(
                    weaponStats,
                    81
                ),
                sniper_rifle_kills: this.getValueFromStat(weaponStats, 83),
                heavy_sniper_kills: this.getValueFromStat(weaponStats, 85),
                heavy_sniper_mk_II_kills: this.getValueFromStat(
                    weaponStats,
                    87
                ),
                military_rifle_kills: this.getValueFromStat(weaponStats, 89),
                heavy_rifle_kills: this.getValueFromStat(weaponStats, 91),
                grenade_launcher_kills: this.getValueFromStat(weaponStats, 93),
                rpg_kills: this.getValueFromStat(weaponStats, 95),
                homing_launcher_kills: this.getValueFromStat(weaponStats, 97),
                minigun_kills: this.getValueFromStat(weaponStats, 99),
                compact_grenade_launcher_kills: this.getValueFromStat(
                    weaponStats,
                    101
                ),
                grenade_kills: this.getValueFromStat(weaponStats, 103),
                sticky_bomb_kills: this.getValueFromStat(weaponStats, 105),
                proximity_mine_kills: this.getValueFromStat(weaponStats, 107),
                tear_gas_kills: this.getValueFromStat(weaponStats, 109),
                molotov_kills: this.getValueFromStat(weaponStats, 111),
                pipe_bomb_kills: this.getValueFromStat(weaponStats, 113),
                unarmed_kills: this.getValueFromStat(weaponStats, 115),
                knife_kills: this.getValueFromStat(weaponStats, 117),
                nightstick_kills: this.getValueFromStat(weaponStats, 119),
                hammer_kills: this.getValueFromStat(weaponStats, 121),
                baseball_bat_kills: this.getValueFromStat(weaponStats, 123),
                crowbar_kills: this.getValueFromStat(weaponStats, 125),
                golf_club_kills: this.getValueFromStat(weaponStats, 127),
                bottle_kills: this.getValueFromStat(weaponStats, 129),
                antique_cavalry_dagger_kills: this.getValueFromStat(
                    weaponStats,
                    131
                ),
                hatchet_kills: this.getValueFromStat(weaponStats, 133),
                knuckle_dusters_kills: this.getValueFromStat(weaponStats, 135),
                flashlight_kills: this.getValueFromStat(weaponStats, 137),
                machete_kills: this.getValueFromStat(weaponStats, 139),
                switchblade_kills: this.getValueFromStat(weaponStats, 141),
                pool_cue_kills: this.getValueFromStat(weaponStats, 143),
                pipe_wrench_kills: this.getValueFromStat(weaponStats, 145),
                battle_axe_kills: this.getValueFromStat(weaponStats, 147),
                stone_hatchet_kills: this.getValueFromStat(weaponStats, 149),
                unholy_hellbringer_kills: this.getValueFromStat(
                    weaponStats,
                    151
                ),
                widowmaker_kills: this.getValueFromStat(weaponStats, 153),
                "up-n-Atomizer_kills": this.getValueFromStat(weaponStats, 155),
                precision_rifle_kills: this.getValueFromStat(weaponStats, 157),
                service_carbine_kills: this.getValueFromStat(weaponStats, 159),
            },
        }
    }

    parsePlayerOverview(data: string) {
        const crew = data.includes('<h3><a href="/crew/')
            ? data
                  .substr(data.indexOf('<h3><a href="/crew/') + 19, 50)
                  .split(">")[1]
                  .split("<")[0]
            : "No Crew"

        return {
            level: Number(
                data
                    .substr(data.indexOf('<h3 style="font-size:') + 20, 15)
                    .split(">")[1]
                    .split("<")[0]
            ),
            play_time: data
                .substr(data.indexOf("<h4>Play Time: ") + 15, 20)
                .split("<")[0],
            cash: data
                .substr(data.indexOf('<span id="cash-value">') + 22, 25)
                .split("<")[0],
            bank: data
                .substr(data.indexOf('<span id="bank-value">') + 22, 25)
                .split("<")[0],
            jobs: data
                .substr(data.indexOf("<span>Jobs</span></h5><p>") + 25, 25)
                .split("<")[0],
            pickup: data
                .substr(data.indexOf("<span>Picked Up</span></h5><p>") + 30, 25)
                .split("<")[0],
            earned: data
                .substr(data.indexOf("<h5>Total Earned</h5><p>") + 24, 25)
                .split("<")[0],
            spend: data
                .substr(data.indexOf("<h5>Total Spent</h5> <p>") + 24, 25)
                .split("<")[0],
            cops_killed: data
                .substr(data.indexOf("<li><h5>Cops killed</h5><p>") + 27, 25)
                .split("<")[0],
            wanted_stars: data
                .substr(
                    data.indexOf("<li><h5>Wanted stars attained</h5><p>") + 37,
                    25
                )
                .split("<")[0],
            time_wanted: data
                .substr(data.indexOf("<li><h5>Time Wanted</h5><p>") + 27, 25)
                .split("<")[0],
            store_hold_ups: data
                .substr(data.indexOf("<li><h5>Store Hold Ups</h5><p>") + 30, 25)
                .split("<")[0],
            crew: crew,
        }
    }
}
