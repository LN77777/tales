import React, { useState, useEffect } from 'react';
import { useQuery } from '@chakra-ui/react';
import { GET_QUEST_CHALLENGES } from '../queries/questChallenges.js';
import { Table, Thead, Tbody, Tr, Th, Td, Text } from '@chakra-ui/react';

function QuestTable() {
    const { loading, error, data } = useQuery(GET_QUEST_CHALLENGES, {
        variables: {
            filters: {
                questId: 5,
            },
            input: {
                first: 5000,
                orderBy: 'id',
                orderDirection: 'DESC',
            },
        },
    });

    const [summaryData, setSummaryData] = useState([]);

    useEffect(() => {
        if (data) {
            const summary = {};

            data.questChallengesConnection.edges.forEach(({ node: { id, createdAt, challengerAddress, reward, isFinished, isVictory } }) => {
                if (isFinished && isVictory) {
                    if (!summary[challengerAddress]) {
                        summary[challengerAddress] = {
                            count: 0,
                            lastRun: new Date(0),
                            totalElm: 0,
                            totalShard: 0,
                            totalXp: 0,
                            totalMedals: 0,
                        };
                    }

                    summary[challengerAddress].count++;
                    summary[challengerAddress].lastRun = new Date(Math.max(summary[challengerAddress].lastRun, new Date(createdAt)));
                    summary[challengerAddress].totalElm += reward.ellerium;
                    summary[challengerAddress].totalShard += reward.elleriumShard;
                    summary[challengerAddress].totalXp += reward.exp;
                    summary[challengerAddress].totalMedals += reward.medals;
                }
            });

            // Convert to array and calculate averages
            const summaryArray = Object.entries(summary).map(([wallet, data]) => ({
                wallet,
                count: data.count,
                lastRun: data.lastRun,
                averageElm: data.totalElm / data.count,
                averageShard: data.totalShard / data.count,
                averageXp: data.totalXp / data.count,
                averageMedals: data.totalMedals / data.count,
            }));

            // Sort by count, descending
            summaryArray.sort((a, b) => b.count - a.count);

            setSummaryData(summaryArray);
        }
    }, [data]);

    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;

    return (
        <div>
            <Text>Rows fetched: {summaryData.length}</Text>

            <Table>
                <Thead>
                    <Tr>
                        <Th>Wallet</Th>
                        <Th>#</Th>
                        <Th>Last Run</Th>
                        <Th>Average $ELM</Th>
                        <Th>A
