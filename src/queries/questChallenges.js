import { gql } from '@apollo/client';

export const GET_QUEST_CHALLENGES = gql`
  query GetQuestChallenges($input: PaginationInput!, $filters: QuestChallengeFilters) {
    questChallengesConnection(filters: $filters, input: $input) {
      pageInfo {
        endCursor
        hasNextPage
      }
      edges {
        node {
          id
          challengerAddress
          createdAt
          isFinished
          isVictory
          questId
          reward {
            ellerium
            elleriumShard
            exp
            medals
          }
        }
      }
    }
  }
`;
